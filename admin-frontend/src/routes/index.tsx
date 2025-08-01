
import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
