import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { auth, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return auth ? <Outlet /> : <Navigate to="/login" />;
}