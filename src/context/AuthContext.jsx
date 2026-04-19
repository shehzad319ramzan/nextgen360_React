import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tsp_token");
    if (token) {
      api.get("/auth/me")
        .then(setUser)
        .catch(() => localStorage.removeItem("tsp_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    localStorage.setItem("tsp_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("tsp_token");
    setUser(null);
  };

  // Check if user has access to a specific module
  const hasPermission = (module) => {
    if (!user) return false;
    // No permissions set = full access (superadmin or unrestricted user)
    if (!user.permissions) return true;
    // Check permissions array
    if (user.permissions.includes(module)) return true;
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
