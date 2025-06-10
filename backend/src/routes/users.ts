import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/User';
import Project from '../models/Project';
import Task from '../models/Task';

const router = Router();

// GET /api/users - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'name', 'email', 'avatar'],
      order: [['name', 'ASC']],
    });

    return res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'name', 'email', 'avatar'],
      include: [
        {
          model: Project,
          as: 'projects',
          attributes: ['id', 'name'],
        },
        {
          model: Task,
          as: 'assignedTasks',
          attributes: ['id', 'title', 'status', 'priority'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
    });
  }
});

// POST /api/users - Create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, name, avatar } = req.body;

    // Validate required fields
    if (!username || !email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Username, email, and name are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this username or email already exists',
      });
    }

    const user = await User.create({
      username,
      email,
      name,
      avatar,
    });

    // Return user without sensitive data
    const createdUser = await User.findByPk(user.id, {
      attributes: ['id', 'username', 'name', 'email', 'avatar'],
    });

    return res.status(201).json({
      success: true,
      data: createdUser,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create user',
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, name, avatar } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Check if username or email is already taken by another user
    if (username || email) {
      const whereConditions: any = {};
      if (username) whereConditions.username = username;
      if (email) whereConditions.email = email;
      
      const existingUser = await User.findOne({
        where: {
          ...whereConditions,
          id: { [Op.ne]: id },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Username or email is already taken',
        });
      }
    }

    await user.update({
      username,
      email,
      name,
      avatar,
    });

    // Return updated user without sensitive data
    const updatedUser = await User.findByPk(id, {
      attributes: ['id', 'username', 'name', 'email', 'avatar'],
    });

    return res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update user',
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Delete associated tasks and projects
    await Task.destroy({
      where: { assigneeId: id },
    });

    await Project.destroy({
      where: { ownerId: id },
    });

    await user.destroy();

    return res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete user',
    });
  }
});

export default router; 