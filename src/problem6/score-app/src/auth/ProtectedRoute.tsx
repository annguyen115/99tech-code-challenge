import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { JSX } from 'react';
import { ROUTE } from '@constants/route';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  
  return user ? children : <Navigate to={ROUTE.LOGIN} replace />;
};
