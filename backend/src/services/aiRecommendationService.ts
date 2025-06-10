import { sequelize } from '../config/database';
import User from '../models/User';
import Project from '../models/Project';
import Task from '../models/Task';

interface TaskRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'urgent';
  estimatedHours: number;
  confidence: number;
  reason: string;
}

interface ProjectInsight {
  projectId: number;
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  averageTaskDuration: number;
  recommendedNextSteps: string[];
}

class AIRecommendationService {
  /**
   * Generate task recommendations based on project patterns and user behavior
   */
  async generateTaskRecommendations(projectId: number, userId: number): Promise<TaskRecommendation[]> {
    try {
      // Get project and user data
      const project = await Project.findByPk(projectId);
      const user = await User.findByPk(userId);
      const projectTasks = await Task.findAll({
        where: { projectId },
        include: [{ model: User, as: 'assignee' }],
        order: [['createdAt', 'DESC']],
        limit: 50
      });

      if (!project || !user) {
        return [];
      }

      const recommendations: TaskRecommendation[] = [];

      // Analyze task patterns
      const taskPatterns = this.analyzeTaskPatterns(projectTasks);
      
      // Generate recommendations based on patterns
      if (taskPatterns.hasIncompleteTasks) {
        recommendations.push({
          id: 'rec-1',
          title: 'Complete pending tasks',
          description: 'Focus on completing existing tasks before starting new ones',
          priority: 'urgent',
          estimatedHours: 2,
          confidence: 0.9,
          reason: 'High number of incomplete tasks detected'
        });
      }

      if (taskPatterns.hasHighPriorityTasks) {
        recommendations.push({
          id: 'rec-2',
          title: 'Review high priority items',
          description: 'Review and update priority levels for better project flow',
          priority: 'normal',
          estimatedHours: 1,
          confidence: 0.8,
          reason: 'Multiple high priority tasks identified'
        });
      }

      if (taskPatterns.averageCompletionTime > 7) {
        recommendations.push({
          id: 'rec-3',
          title: 'Break down complex tasks',
          description: 'Consider breaking larger tasks into smaller, manageable pieces',
          priority: 'normal',
          estimatedHours: 3,
          confidence: 0.7,
          reason: 'Tasks taking longer than average to complete'
        });
      }

      // Add project-specific recommendations
      if (project.name.toLowerCase().includes('website') || project.name.toLowerCase().includes('web')) {
        recommendations.push({
          id: 'rec-4',
          title: 'Add responsive design testing',
          description: 'Ensure website works well on mobile and tablet devices',
          priority: 'normal',
          estimatedHours: 4,
          confidence: 0.6,
          reason: 'Web project detected - common requirement'
        });
      }

      if (project.name.toLowerCase().includes('api') || project.name.toLowerCase().includes('backend')) {
        recommendations.push({
          id: 'rec-5',
          title: 'Add API documentation',
          description: 'Create comprehensive API documentation for developers',
          priority: 'normal',
          estimatedHours: 6,
          confidence: 0.7,
          reason: 'Backend/API project detected - documentation is crucial'
        });
      }

      return recommendations.slice(0, 5); // Return top 5 recommendations
    } catch (error) {
      console.error('Error generating task recommendations:', error);
      return [];
    }
  }

  /**
   * Generate project insights and analytics
   */
  async generateProjectInsights(projectId: number): Promise<ProjectInsight | null> {
    try {
      const project = await Project.findByPk(projectId);
      if (!project) return null;

      const tasks = await Task.findAll({
        where: { projectId },
        include: [{ model: User, as: 'assignee' }]
      });

      const completedTasks = tasks.filter(task => task.status === 'done');
      const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

      // Calculate average task duration (simplified)
      const averageTaskDuration = tasks.length > 0 ? 
        tasks.reduce((sum: number, task: Task) => {
          const createdAt = new Date(task.createdAt);
          const updatedAt = new Date(task.updatedAt);
          return sum + (updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24); // days
        }, 0) / tasks.length : 0;

      // Generate recommended next steps
      const recommendedNextSteps: string[] = [];
      
      if (completionRate < 50) {
        recommendedNextSteps.push('Focus on completing existing tasks before adding new ones');
      }
      
      if (averageTaskDuration > 7) {
        recommendedNextSteps.push('Consider breaking down larger tasks into smaller pieces');
      }
      
      if (tasks.filter((t: Task) => t.priority === 'urgent').length > 3) {
        recommendedNextSteps.push('Review and prioritize urgent tasks');
      }

      if (recommendedNextSteps.length === 0) {
        recommendedNextSteps.push('Project is progressing well - continue current approach');
      }

      return {
        projectId: project.id,
        projectName: project.name,
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        completionRate: Math.round(completionRate * 100) / 100,
        averageTaskDuration: Math.round(averageTaskDuration * 100) / 100,
        recommendedNextSteps
      };
    } catch (error) {
      console.error('Error generating project insights:', error);
      return null;
    }
  }

  /**
   * Analyze task patterns for recommendations
   */
  private analyzeTaskPatterns(tasks: Task[]): {
    hasIncompleteTasks: boolean;
    hasHighPriorityTasks: boolean;
    averageCompletionTime: number;
    taskDistribution: Record<string, number>;
  } {
    const incompleteTasks = tasks.filter(task => task.status !== 'done');
    const highPriorityTasks = tasks.filter(task => task.priority === 'urgent');
    
    // Calculate average completion time (simplified)
    const completedTasks = tasks.filter(task => task.status === 'done');
    const averageCompletionTime = completedTasks.length > 0 ? 
      completedTasks.reduce((sum: number, task: Task) => {
        const createdAt = new Date(task.createdAt);
        const updatedAt = new Date(task.updatedAt);
        return sum + (updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      }, 0) / completedTasks.length : 0;

    // Analyze task distribution by status
    const taskDistribution = tasks.reduce((acc: Record<string, number>, task: Task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      hasIncompleteTasks: incompleteTasks.length > 0,
      hasHighPriorityTasks: highPriorityTasks.length > 0,
      averageCompletionTime,
      taskDistribution
    };
  }

  /**
   * Suggest optimal task assignment based on user workload
   */
  async suggestTaskAssignment(taskId: number): Promise<User[] | null> {
    try {
      const task = await Task.findByPk(taskId, {
        include: [{ model: Project, as: 'project' }]
      });
      
      if (!task) return null;

      // Get all users and their current workload
      const users = await User.findAll();
      const userWorkloads = await Promise.all(
        users.map(async (user: User) => {
          const assignedTasks = await Task.count({
            where: { 
              assigneeId: user.id,
              status: { [require('sequelize').Op.ne]: 'done' }
            }
          });
          return { user, workload: assignedTasks };
        })
      );

      // Sort by workload (ascending) to suggest users with lighter load
      return userWorkloads
        .sort((a: { user: User; workload: number }, b: { user: User; workload: number }) => a.workload - b.workload)
        .slice(0, 3)
        .map(item => item.user);
    } catch (error) {
      console.error('Error suggesting task assignment:', error);
      return null;
    }
  }
}

export default new AIRecommendationService(); 