// Task related types
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  projectId: number;
  assigneeId?: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  project?: Project;
  assignee?: User;
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
  createdAt: string;
  updatedAt: string;
  owner?: User;
  tasks?: Task[];
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
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
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

// UI Component Props
export interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: (taskId: number, updates: UpdateTaskRequest) => void;
  onTaskDelete: (taskId: number) => void;
}

export interface TaskRowProps {
  task: Task;
  onUpdate: (updates: UpdateTaskRequest) => void;
  onDelete: () => void;
}

export interface TaskFormProps {
  onSubmit: (task: CreateTaskRequest) => void;
  onCancel: () => void;
  initialData?: Partial<Task>;
  projects: Project[];
  users: User[];
}

export interface ProjectFormProps {
  onSubmit: (project: CreateProjectRequest) => void;
  onCancel: () => void;
  initialData?: Partial<Project>;
  users: User[];
} 