import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect() {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isSocketConnected(): boolean {
    return this.isConnected;
  }

  // Task events
  onTaskCreated(callback: (task: any) => void) {
    if (this.socket) {
      this.socket.on('taskCreated', callback);
    }
  }

  onTaskUpdated(callback: (task: any) => void) {
    if (this.socket) {
      this.socket.on('taskUpdated', callback);
    }
  }

  onTaskDeleted(callback: (taskId: number) => void) {
    if (this.socket) {
      this.socket.on('taskDeleted', callback);
    }
  }

  // Project events
  onProjectCreated(callback: (project: any) => void) {
    if (this.socket) {
      this.socket.on('projectCreated', callback);
    }
  }

  onProjectUpdated(callback: (project: any) => void) {
    if (this.socket) {
      this.socket.on('projectUpdated', callback);
    }
  }

  onProjectDeleted(callback: (projectId: number) => void) {
    if (this.socket) {
      this.socket.on('projectDeleted', callback);
    }
  }

  // Remove event listeners
  offTaskCreated() {
    if (this.socket) {
      this.socket.off('taskCreated');
    }
  }

  offTaskUpdated() {
    if (this.socket) {
      this.socket.off('taskUpdated');
    }
  }

  offTaskDeleted() {
    if (this.socket) {
      this.socket.off('taskDeleted');
    }
  }

  offProjectCreated() {
    if (this.socket) {
      this.socket.off('projectCreated');
    }
  }

  offProjectUpdated() {
    if (this.socket) {
      this.socket.off('projectUpdated');
    }
  }

  offProjectDeleted() {
    if (this.socket) {
      this.socket.off('projectDeleted');
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService; 