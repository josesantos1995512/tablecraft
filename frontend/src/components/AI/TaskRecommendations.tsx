import React, { useState, useEffect } from 'react';
import { Lightbulb, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { aiApi } from '../../services/api';

interface TaskRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'urgent';
  estimatedHours: number;
  confidence: number;
  reason: string;
}

interface TaskRecommendationsProps {
  projectId: number;
  onApplyRecommendation?: (recommendation: TaskRecommendation) => void;
}

const TaskRecommendations: React.FC<TaskRecommendationsProps> = ({ 
  projectId, 
  onApplyRecommendation 
}) => {
  const [recommendations, setRecommendations] = useState<TaskRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecommendations();
  }, [projectId]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aiApi.getTaskRecommendations(projectId);
      if (response.success) {
        setRecommendations(response.data as TaskRecommendation[] || []);
      } else {
        setError('Failed to load recommendations');
      }
    } catch (err) {
      setError('Error loading recommendations');
      console.error('Error loading recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'normal':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '🔥';
      case 'normal':
        return '⚡';
      case 'low':
        return '🌱';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadRecommendations}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-500">No recommendations available at this time.</p>
          <p className="text-sm text-gray-400 mt-2">Create more tasks to get personalized suggestions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <button
          onClick={loadRecommendations}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPriorityIcon(recommendation.priority)}</span>
                <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                  recommendation.priority
                )}`}
              >
                {recommendation.priority}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">{recommendation.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recommendation.estimatedHours}h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{Math.round(recommendation.confidence * 100)}% confidence</span>
                </div>
              </div>

              {onApplyRecommendation && (
                <button
                  onClick={() => onApplyRecommendation(recommendation)}
                  className="btn btn-primary btn-sm"
                >
                  Apply
                </button>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                <strong>Why this recommendation:</strong> {recommendation.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskRecommendations; 