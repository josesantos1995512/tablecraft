import React from 'react';
import { Home, Folder, Users, BarChart3, Settings, X } from 'lucide-react';
import type { Project } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  selectedProject?: number;
  onProjectSelect: (projectId: number) => void;
  onNewProject: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  projects, 
  selectedProject, 
  onProjectSelect,
  onNewProject
}) => {
  const navigation = [
    { name: 'Dashboard', icon: Home, href: '#', current: true },
    { name: 'Projects', icon: Folder, href: '#', current: false },
    { name: 'Team', icon: Users, href: '#', current: false },
    { name: 'Analytics', icon: BarChart3, href: '#', current: false },
    { name: 'Settings', icon: Settings, href: '#', current: false },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${item.current 
                    ? 'bg-primary-100 text-primary-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Projects Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Projects
              </h3>
              <button
                onClick={onNewProject}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                + New
              </button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onProjectSelect(project.id)}
                  className={`
                    group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md
                    ${selectedProject === project.id
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Folder className="mr-3 h-4 w-4" />
                  <span className="truncate">{project.name}</span>
                </button>
              ))}
              
              {projects.length === 0 && (
                <div className="text-sm text-gray-500 px-2 py-2">
                  No projects yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 