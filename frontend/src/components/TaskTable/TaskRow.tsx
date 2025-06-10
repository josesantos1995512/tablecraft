import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { MoreVertical, Calendar, User } from 'lucide-react';
import type { Task, UpdateTaskRequest } from '../../types';

interface TaskRowProps {
  task: Task;
  onUpdate: (updates: UpdateTaskRequest) => void;
  onDelete: () => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onUpdate, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { 
      id: task.id, 
      type: 'task',
      sourceStatus: task.status 
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'normal':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  // Connect drag ref
  drag(ref);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
          <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
            {task.title}
          </h4>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  onUpdate({ status: 'in-progress' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Start
              </button>
              <button
                onClick={() => {
                  onUpdate({ status: 'done' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Complete
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Task Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          {task.assignee && (
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{task.assignee.name}</span>
            </div>
          )}
        </div>

        {task.project && (
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {task.project.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskRow; 