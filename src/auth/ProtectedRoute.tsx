import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return <>{children}</>;
}
