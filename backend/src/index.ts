import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes (will be added later)
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to TableCraft API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      tasks: '/api/tasks',
      projects: '/api/projects'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TableCraft Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API docs: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app; 