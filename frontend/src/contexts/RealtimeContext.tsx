import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import socketService from '../services/socketService';
import type { Task, Project } from '../types';

interface RealtimeContextType {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

interface RealtimeProviderProps {
  children: ReactNode;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  onTaskDeleted?: (taskId: number) => void;
  onProjectCreated?: (project: Project) => void;
  onProjectUpdated?: (project: Project) => void;
  onProjectDeleted?: (projectId: number) => void;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({
  children,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  onProjectCreated,
  onProjectUpdated,
  onProjectDeleted,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    const socket = socketService.connect();
    
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Set up event listeners
    if (onTaskCreated) {
      socketService.onTaskCreated(onTaskCreated);
    }

    if (onTaskUpdated) {
      socketService.onTaskUpdated(onTaskUpdated);
    }

    if (onTaskDeleted) {
      socketService.onTaskDeleted(onTaskDeleted);
    }

    if (onProjectCreated) {
      socketService.onProjectCreated(onProjectCreated);
    }

    if (onProjectUpdated) {
      socketService.onProjectUpdated(onProjectUpdated);
    }

    if (onProjectDeleted) {
      socketService.onProjectDeleted(onProjectDeleted);
    }
  };

  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
  };

  useEffect(() => {
    // Connect on mount
    connect();

    // Cleanup on unmount
    return () => {
      socketService.offTaskCreated();
      socketService.offTaskUpdated();
      socketService.offTaskDeleted();
      socketService.offProjectCreated();
      socketService.offProjectUpdated();
      socketService.offProjectDeleted();
      disconnect();
    };
  }, []);

  const value: RealtimeContextType = {
    isConnected,
    connect,
    disconnect,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = (): RealtimeContextType => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}; 