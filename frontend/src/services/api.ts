import type { 
  Task, 
  Project, 
  User, 
  CreateTaskRequest, 
  UpdateTaskRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateUserRequest,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse 
} from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Task API functions
export const taskApi = {
  // Get all tasks
  getAll: (params?: { projectId?: number; status?: string; priority?: string; assigneeId?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    
    return apiRequest<Task[]>(endpoint);
  },

  // Get task by ID
  getById: (id: number) => {
    return apiRequest<Task>(`/tasks/${id}`);
  },

  // Create new task
  create: (task: CreateTaskRequest) => {
    return apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  // Update task
  update: (id: number, updates: UpdateTaskRequest) => {
    return apiRequest<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete task
  delete: (id: number) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

// Project API functions
export const projectApi = {
  // Get all projects
  getAll: (params?: { ownerId?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.ownerId) {
      searchParams.append('ownerId', params.ownerId.toString());
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/projects?${queryString}` : '/projects';
    
    return apiRequest<Project[]>(endpoint);
  },

  // Get project by ID
  getById: (id: number) => {
    return apiRequest<Project>(`/projects/${id}`);
  },

  // Create new project
  create: (project: CreateProjectRequest) => {
    return apiRequest<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  // Update project
  update: (id: number, updates: UpdateProjectRequest) => {
    return apiRequest<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete project
  delete: (id: number) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// User API functions
export const userApi = {
  // Get all users
  getAll: () => {
    return apiRequest<User[]>('/users');
  },

  // Get user by ID
  getById: (id: number) => {
    return apiRequest<User>(`/users/${id}`);
  },

  // Create new user
  create: (user: CreateUserRequest) => {
    return apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  // Update user
  update: (id: number, updates: Partial<User>) => {
    return apiRequest<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete user
  delete: (id: number) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// AI API functions
export const aiApi = {
  // Get task recommendations for a project
  getTaskRecommendations: (projectId: number, userId?: number) => {
    const endpoint = userId ? `/ai/recommendations/${projectId}?userId=${userId}` : `/ai/recommendations/${projectId}`;
    return apiRequest(endpoint);
  },

  // Get project insights and analytics
  getProjectInsights: (projectId: number) => {
    return apiRequest(`/ai/insights/${projectId}`);
  },

  // Get task assignment suggestions
  getAssignmentSuggestions: (taskId: number) => {
    return apiRequest(`/ai/assignment-suggestions/${taskId}`);
  },
};

// Auth API functions
export const authApi = {
  // Register new user
  register: (userData: RegisterRequest) => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: (loginData: LoginRequest) => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  // Get user profile
  getProfile: () => {
    return apiRequest('/auth/profile');
  },

  // Update user profile
  updateProfile: (updateData: Partial<User>) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Verify token
  verifyToken: () => {
    return apiRequest('/auth/verify');
  },
};

export default {
  taskApi,
  projectApi,
  userApi,
  aiApi,
  authApi,
}; 