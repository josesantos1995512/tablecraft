import React from 'react';
import { useRealtime } from '../../contexts/RealtimeContext';

const ConnectionStatus: React.FC = () => {
  const { isConnected } = useRealtime();

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className="text-xs text-gray-600">
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
};

export default ConnectionStatus; 