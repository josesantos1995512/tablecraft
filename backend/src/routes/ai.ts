import { Router } from 'express';
import aiRecommendationService from '../services/aiRecommendationService';

const router = Router();

// Get task recommendations for a project
router.get('/recommendations/:projectId', async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const userId = parseInt(req.query.userId as string) || 1; // Default to user 1 for now

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    const recommendations = await aiRecommendationService.generateTaskRecommendations(projectId, userId);
    
    return res.json({
      success: true,
      data: recommendations
    });
      } catch (error) {
      console.error('Error getting task recommendations:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get task recommendations'
      });
    }
});

// Get project insights and analytics
router.get('/insights/:projectId', async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID'
      });
    }

    const insights = await aiRecommendationService.generateProjectInsights(projectId);
    
    if (!insights) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    return res.json({
      success: true,
      data: insights
    });
      } catch (error) {
      console.error('Error getting project insights:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get project insights'
      });
    }
});

// Get task assignment suggestions
router.get('/assignment-suggestions/:taskId', async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }

    const suggestions = await aiRecommendationService.suggestTaskAssignment(taskId);
    
    if (!suggestions) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    return res.json({
      success: true,
      data: suggestions
    });
      } catch (error) {
      console.error('Error getting assignment suggestions:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get assignment suggestions'
      });
    }
});

export default router; 