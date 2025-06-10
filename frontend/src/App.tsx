import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import TaskTable from './components/TaskTable/TaskTable';
import TaskForm from './components/Forms/TaskForm';
import ProjectForm from './components/Forms/ProjectForm';
import { RealtimeProvider } from './contexts/RealtimeContext';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import NotificationToast from './components/Layout/NotificationToast';
import TaskRecommendations from './components/AI/TaskRecommendations';
import ProjectInsights from './components/AI/ProjectInsights';
import AuthPage from './components/Auth/AuthPage';
import type { Task, Project, User, CreateTaskRequest, UpdateTaskRequest, CreateProjectRequest, UpdateProjectRequest } from './types';
import { taskApi, projectApi, userApi } from './services/api';
import './App.css';

function AppContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // AI Insights state
  const [showAIInsights, setShowAIInsights] = useState(false);

  const { addNotification } = useNotifications();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Load initial data
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [tasksResponse, projectsResponse, usersResponse] = await Promise.all([
          taskApi.getAll(),
          projectApi.getAll(),
          userApi.getAll(),
        ]);

        if (tasksResponse.success) setTasks(tasksResponse.data || []);
        if (projectsResponse.success) setProjects(projectsResponse.data || []);
        if (usersResponse.success) setUsers(usersResponse.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated]);

  // Handle task updates
  const handleTaskUpdate = async (taskId: number, updates: UpdateTaskRequest) => {
    try {
      const response = await taskApi.update(taskId, updates);
      if (response.success && response.data) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? response.data! : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (taskId: number) => {
    try {
      await taskApi.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle new task creation
  const handleNewTask = () => {
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  // Handle task form submission
  const handleTaskSubmit = async (taskData: CreateTaskRequest | UpdateTaskRequest) => {
    try {
      if (editingTask) {
        // Update existing task
        const response = await taskApi.update(editingTask.id, taskData as UpdateTaskRequest);
        if (response.success && response.data) {
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === editingTask.id ? response.data! : task
            )
          );
        }
      } else {
        // Create new task
        const response = await taskApi.create(taskData as CreateTaskRequest);
        if (response.success && response.data) {
          setTasks(prevTasks => [...prevTasks, response.data!]);
        }
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Handle new project creation
  const handleNewProject = () => {
    setEditingProject(null);
    setIsProjectFormOpen(true);
  };

  // Handle project form submission
  const handleProjectSubmit = async (projectData: CreateProjectRequest | UpdateProjectRequest) => {
    try {
      if (editingProject) {
        // Update existing project
        const response = await projectApi.update(editingProject.id, projectData as UpdateProjectRequest);
        if (response.success && response.data) {
          setProjects(prevProjects => 
            prevProjects.map(project => 
              project.id === editingProject.id ? response.data! : project
            )
          );
        }
      } else {
        // Create new project
        const response = await projectApi.create(projectData as CreateProjectRequest);
        if (response.success && response.data) {
          setProjects(prevProjects => [...prevProjects, response.data!]);
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  // Handle project selection
  const handleProjectSelect = (projectId: number) => {
    setSelectedProject(projectId);
    setIsSidebarOpen(false);
  };

  // Real-time event handlers
  const handleTaskCreated = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
    addNotification({
      type: 'success',
      title: 'Task Created',
      message: `Task "${task.title}" has been created successfully.`,
    });
  };

  const handleTaskUpdated = (task: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === task.id ? task : t)
    );
    addNotification({
      type: 'info',
      title: 'Task Updated',
      message: `Task "${task.title}" has been updated.`,
    });
  };

  const handleTaskDeleted = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    addNotification({
      type: 'warning',
      title: 'Task Deleted',
      message: 'A task has been deleted.',
    });
  };

  const handleProjectCreated = (project: Project) => {
    setProjects(prevProjects => [...prevProjects, project]);
    addNotification({
      type: 'success',
      title: 'Project Created',
      message: `Project "${project.name}" has been created successfully.`,
    });
  };

  const handleProjectUpdated = (project: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === project.id ? project : p)
    );
    addNotification({
      type: 'info',
      title: 'Project Updated',
      message: `Project "${project.name}" has been updated.`,
    });
  };

  const handleProjectDeleted = (projectId: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    // If the deleted project was selected, clear the selection
    if (selectedProject === projectId) {
      setSelectedProject(undefined);
    }
    addNotification({
      type: 'warning',
      title: 'Project Deleted',
      message: 'A project has been deleted.',
    });
  };

  // Handle AI recommendation application
  const handleApplyRecommendation = (recommendation: any) => {
    // Create a new task based on the recommendation
    const newTask = {
      title: recommendation.title,
      description: recommendation.description,
      priority: recommendation.priority,
      projectId: selectedProject || 1,
      status: 'todo' as const,
    };

    handleTaskSubmit(newTask);
    addNotification({
      type: 'success',
      title: 'AI Recommendation Applied',
      message: `Task "${recommendation.title}" has been created from AI recommendation.`,
    });
  };

  // Filter tasks by selected project
  const filteredTasks = selectedProject 
    ? tasks.filter(task => task.projectId === selectedProject)
    : tasks;

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading TableCraft...</p>
        </div>
      </div>
    );
  }

  // Show authentication page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show loading spinner while loading data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <RealtimeProvider
      onTaskCreated={handleTaskCreated}
      onTaskUpdated={handleTaskUpdated}
      onTaskDeleted={handleTaskDeleted}
      onProjectCreated={handleProjectCreated}
      onProjectUpdated={handleProjectUpdated}
      onProjectDeleted={handleProjectDeleted}
    >
      <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          projects={projects}
          selectedProject={selectedProject}
          onProjectSelect={handleProjectSelect}
          onNewProject={handleNewProject}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Header */}
          <Header
            onNewTask={handleNewTask}
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onToggleAIInsights={() => setShowAIInsights(!showAIInsights)}
            showAIInsights={showAIInsights}
            hasSelectedProject={!!selectedProject}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-hidden">
            <div className="flex h-full">
              {/* Task Table */}
              <div className={`${showAIInsights ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
                {filteredTasks.length > 0 ? (
                  <TaskTable
                    tasks={filteredTasks}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No tasks found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {selectedProject 
                          ? 'This project has no tasks yet.' 
                          : 'Get started by creating your first task.'
                        }
                      </p>
                      <button
                        onClick={handleNewTask}
                        className="btn btn-primary"
                      >
                        Create Task
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Insights Panel */}
              {showAIInsights && selectedProject && (
                <div className="w-1/3 border-l border-gray-200 bg-gray-50 overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
                      <button
                        onClick={() => setShowAIInsights(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <ProjectInsights projectId={selectedProject} />
                    
                    <TaskRecommendations 
                      projectId={selectedProject}
                      onApplyRecommendation={handleApplyRecommendation}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isTaskFormOpen}
          onClose={() => {
            setIsTaskFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleTaskSubmit}
          initialData={editingTask || undefined}
          projects={projects}
          users={users}
          mode={editingTask ? 'edit' : 'create'}
        />

        {/* Project Form Modal */}
        <ProjectForm
          isOpen={isProjectFormOpen}
          onClose={() => {
            setIsProjectFormOpen(false);
            setEditingProject(null);
          }}
          onSubmit={handleProjectSubmit}
          initialData={editingProject || undefined}
          users={users}
          mode={editingProject ? 'edit' : 'create'}
        />
      </div>
      </DndProvider>
    </RealtimeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
        <NotificationToast />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
