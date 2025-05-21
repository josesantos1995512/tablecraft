// Task related types
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  projectId: number;
  assigneeId?: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: 'urgent' | 'normal' | 'low';
  projectId: number;
  assigneeId?: number;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: 'urgent' | 'normal' | 'low';
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  assigneeId?: number;
  dueDate?: string;
}

// Project related types
export interface Project {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  ownerId: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Workload visualization types
export interface WorkloadData {
  userId: number;
  userName: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completionRate: number;
}

// Drag and drop types
export interface DragItem {
  id: number;
  type: 'task';
  sourceIndex: number;
  sourceStatus: string;
}

// Priority types
export type Priority = 'urgent' | 'normal' | 'low';

// Status types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

// Environment types
export interface Environment {
  NODE_ENV: string;
  PORT: string;
  DB_PATH: string;
  JWT_SECRET: string;
  CORS_ORIGIN: string;
} 