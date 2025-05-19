import { Navigate } from 'react-router-dom';
import { AuthService } from './auth';

export default function ProtectedRoute({ children }) {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
