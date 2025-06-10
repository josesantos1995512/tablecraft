import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { aiApi } from '../../services/api';

interface ProjectInsight {
  projectId: number;
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  averageTaskDuration: number;
  recommendedNextSteps: string[];
}

interface ProjectInsightsProps {
  projectId: number;
}

const ProjectInsights: React.FC<ProjectInsightsProps> = ({ projectId }) => {
  const [insights, setInsights] = useState<ProjectInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInsights();
  }, [projectId]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aiApi.getProjectInsights(projectId);
      if (response.success) {
        setInsights(response.data as ProjectInsight);
      } else {
        setError('Failed to load project insights');
      }
    } catch (err) {
      setError('Error loading project insights');
      console.error('Error loading project insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionRateIcon = (rate: number) => {
    if (rate >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (rate >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Project Insights</h3>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Project Insights</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadInsights}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Project Insights</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No insights available for this project.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Project Insights</h3>
        </div>
        <button
          onClick={loadInsights}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{insights.totalTasks}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <div className="flex items-center space-x-2">
                <p className={`text-2xl font-bold ${getCompletionRateColor(insights.completionRate)}`}>
                  {insights.completionRate}%
                </p>
                {getCompletionRateIcon(insights.completionRate)}
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {insights.averageTaskDuration.toFixed(1)} days
              </p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {insights.completedTasks} of {insights.totalTasks} tasks completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              insights.completionRate >= 80 ? 'bg-green-500' :
              insights.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${insights.completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div>
        <h4 className="text-md font-semibold text-gray-900 mb-3">Recommended Next Steps</h4>
        <div className="space-y-2">
          {insights.recommendedNextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <p className="text-sm text-blue-900">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectInsights; 