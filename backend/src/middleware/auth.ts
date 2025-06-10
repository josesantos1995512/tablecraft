import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        name: string;
        avatar?: string;
      };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token required'
      });
      return;
    }

    const result = await authService.verifyToken(token);
    
    if (!result.success) {
      res.status(401).json({
        success: false,
        message: result.message || 'Invalid token'
      });
      return;
    }

    req.user = result.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const result = await authService.verifyToken(token);
      if (result.success) {
        req.user = result.user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
}; 