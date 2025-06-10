import React, { useState } from 'react';
import { Plus, Menu, Bell, User, Brain, LogOut } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNewTask: () => void;
  onToggleSidebar: () => void;
  onToggleAIInsights: () => void;
  showAIInsights: boolean;
  hasSelectedProject: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onNewTask, 
  onToggleSidebar, 
  onToggleAIInsights, 
  showAIInsights, 
  hasSelectedProject 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900">
                TableCraft
              </h1>
              <span className="ml-2 text-sm text-gray-500 hidden sm:block">
                Project Management
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <ConnectionStatus />

            {/* AI Insights Button */}
            {hasSelectedProject && (
              <button
                onClick={onToggleAIInsights}
                className={`p-2 rounded-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${
                  showAIInsights 
                    ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                    : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                }`}
                title="AI Insights"
              >
                <Brain className="h-5 w-5" />
                <span className="hidden sm:block text-sm font-medium">AI Insights</span>
              </button>
            )}

            {/* New Task Button */}
            <button
              onClick={onNewTask}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <Bell className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <User className="h-6 w-6" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 