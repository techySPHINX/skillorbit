import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
import SwapsPage from "../pages/Swaps";
import ProfilePage from "../pages/Profile";
import NotificationsPage from "../pages/Notifications";
import FeedbackPage from "../pages/Feedback";
import AdminDashboardPage from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import Navbar from "../components/Navbar";
import UserProfilePage from "../pages/UserProfile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/skills" element={<Skills />} />
        <Route path="/swaps" element={<SwapsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/feedback/user/:userId" element={<FeedbackPage />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/admin" element={<AdminDashboardPage />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

