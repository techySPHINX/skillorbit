import { RouterProvider } from "react-router-dom";
import './styles/AdminStyles.css';
import { router } from "./routes";
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { adminSocketService } from './services/socketService';

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        adminSocketService.connect(token);
      }
    } else {
      adminSocketService.disconnect();
    }

    return () => {
      adminSocketService.disconnect();
    };
  }, [isAuthenticated]);

  return <RouterProvider router={router} />;
}

export default App;