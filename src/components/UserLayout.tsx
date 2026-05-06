import { Outlet, Navigate } from "react-router-dom";
import { UserProfile } from "@/types";

interface UserLayoutProps {
  user: UserProfile | null;
  isLoading: boolean;
}

export default function UserLayout({ user, isLoading }: UserLayoutProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
