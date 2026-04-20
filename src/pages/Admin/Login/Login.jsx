import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0F4C8F] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, #388ECA 0%, transparent 60%), radial-gradient(circle at 80% 80%, #388ECA 0%, transparent 50%)"
        }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">NextGen360</h1>
          <p className="text-blue-200 text-sm max-w-xs leading-relaxed">
            Manage your website content, SEO, blog posts, and customer inquiries from one place.
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center bg-[#f4f7fb] px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-[#0F4C8F] rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F4C8F]">NextGen360</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500 mb-6">Sign in to the admin panel</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent transition-all"
                  placeholder="example@test.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            NextGen360 Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
