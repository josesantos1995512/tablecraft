import { sequelize } from '../config/database';
import User from './User';
import Project from './Project';
import Task from './Task';

// Import models to ensure they are registered
const models = {
  User,
  Project,
  Task,
};

// Setup associations
const setupAssociations = () => {
  // User associations
  User.hasMany(Project, { as: 'projects', foreignKey: 'ownerId' });
  User.hasMany(Task, { as: 'assignedTasks', foreignKey: 'assigneeId' });

  // Project associations
  Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
  Project.hasMany(Task, { as: 'tasks', foreignKey: 'projectId' });

  // Task associations
  Task.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
  Task.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });
};

// Database synchronization
export const syncDatabase = async () => {
  try {
    // Setup associations before syncing
    setupAssociations();
    
    // For SQLite, use force: false to avoid alter issues
    // SQLite doesn't support alter operations well
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    throw error;
  }
};

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export default models; 