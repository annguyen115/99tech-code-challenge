import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { appConfig } from '@config/config';

const socket: Socket = io(appConfig.REACT_APP_SOCKET_SERVER_SCORE_URL);

export const useScoreSocket = (limit: number, onScoreUpdate: () => Promise<void>) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsSocketConnected(true);
      console.log('[✅ Socket connected]', socket.id);
    });
    
    socket.on('connect_error', (err) => {
      setIsSocketConnected(false);
      console.error('[❌ Socket connect error]', err.message);
    });
    
    socket.on('score-updated', () => {
      console.log('score-updated received!');
      void onScoreUpdate();
    });
    
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('score-updated');
    };
  }, [limit]);
  
  return {
    isSocketConnected
  }
};