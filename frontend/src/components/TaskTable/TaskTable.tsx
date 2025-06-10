import React from 'react';
import { useDrop } from 'react-dnd';
import type { Task, UpdateTaskRequest } from '../../types';
import TaskRow from './TaskRow';

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: (taskId: number, updates: UpdateTaskRequest) => void;
  onTaskDelete: (taskId: number) => void;
}

interface DragItem {
  id: number;
  type: string;
  sourceStatus: string;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDrop = (status: 'todo' | 'in-progress' | 'review' | 'done') => (item: DragItem) => {
    if (item.sourceStatus !== status) {
      onTaskUpdate(item.id, { status });
    }
  };

  const statusColumns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' },
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex space-x-4 p-4">
        {statusColumns.map((column) => {
          const [{ isOver }, drop] = useDrop({
            accept: 'task',
            drop: handleDrop(column.id as 'todo' | 'in-progress' | 'review' | 'done'),
            collect: (monitor) => ({
              isOver: !!monitor.isOver(),
            }),
          });

          return (
            <div
              key={column.id}
              className="flex-1 flex flex-col min-w-0"
            >
              {/* Column Header */}
              <div className={`${column.color} rounded-lg p-3 mb-3`}>
                <h3 className="font-medium text-gray-900">
                  {column.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {getTasksByStatus(column.id).length} tasks
                </p>
              </div>

              {/* Task List */}
              <div
                ref={drop}
                className={`flex-1 overflow-y-auto space-y-2 p-2 rounded-lg transition-colors duration-200 ${
                  isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
                }`}
              >
                {getTasksByStatus(column.id).map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onUpdate={(updates: UpdateTaskRequest) => onTaskUpdate(task.id, updates)}
                    onDelete={() => onTaskDelete(task.id)}
                  />
                ))}
                
                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskTable; 