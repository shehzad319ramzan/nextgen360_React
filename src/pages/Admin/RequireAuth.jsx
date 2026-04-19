import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loader";

export default function RequireAuth({ children, adminOnly = false, module = null }) {
  const { user, loading, hasPermission } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );

  if (!user) return <Navigate to="/admin/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/admin/dashboard" replace />;
  if (module && !hasPermission(module)) return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-5xl mb-4 text-gray-300">403</div>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">Access Denied</h2>
        <p className="text-sm text-gray-500">You don't have permission to access this module.</p>
      </div>
    </div>
  );

  return children;
}
