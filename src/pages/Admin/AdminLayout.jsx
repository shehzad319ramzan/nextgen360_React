import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, TrendingUp, MessageSquare, Search, BookOpen,
  Briefcase, Star, UserCircle, FolderOpen, Mail, Image,
  Users, Settings, ScrollText, LogOut, FileText, FileCog, Zap,
  Menu, X,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard", module: "dashboard" },
      { to: "/admin/analytics", icon: TrendingUp, label: "Analytics", module: "analytics" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/inquiries", icon: MessageSquare, label: "Inquiries", module: "inquiries" },
      { to: "/admin/blogs", icon: BookOpen, label: "Blogs", module: "blogs" },
      { to: "/admin/jobs", icon: Briefcase, label: "Job Openings", module: "jobs" },
      { to: "/admin/job-applications", icon: Briefcase, label: "Applications", module: "job-applications" },
      { to: "/admin/testimonials", icon: Star, label: "Testimonials", module: "testimonials" },
      { to: "/admin/team", icon: UserCircle, label: "Team", module: "team" },
      { to: "/admin/portfolio", icon: FolderOpen, label: "Portfolio", module: "portfolio" },
      { to: "/admin/case-studies", icon: BookOpen, label: "Case Studies", module: "case-studies" },
      { to: "/admin/solutions", icon: Zap, label: "Solutions", module: "solutions" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/admin/seo", icon: Search, label: "SEO", module: "seo" },
      { to: "/admin/robots-txt", icon: FileText, label: "Robots.txt", module: "robots-txt" },
      { to: "/admin/htaccess", icon: FileCog, label: ".htaccess", module: "htaccess" },
      { to: "/admin/newsletter", icon: Mail, label: "Newsletter", module: "newsletter" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/media", icon: Image, label: "Media Library", module: "media" },
      { to: "/admin/users", icon: Users, label: "Users", module: "users" },
      { to: "/admin/settings", icon: Settings, label: "Settings", module: "settings" },
      { to: "/admin/activity-log", icon: ScrollText, label: "Activity Log", module: "activity-log" },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasPermission = (mod) => {
    if (!user) return false;
    if (!user.permissions) return true;
    return user.permissions.includes(mod);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Auto-close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="flex h-screen bg-[#f4f7fb]" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0F4C8F] text-white flex items-center justify-between px-4 shadow">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <p className="font-bold text-sm">TSP Admin</p>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg hover:bg-white/10"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 lg:w-60 bg-[#0F4C8F] text-white flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">TSP Admin</p>
                <p className="text-[10px] text-blue-200 leading-tight">NextGen360</p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white"
            >
              <X size={18} />
            </button>
          </div>
          <div className="bg-white/10 rounded-lg px-3 py-2">
            <p className="text-xs font-medium text-white leading-tight truncate">{user?.name}</p>
            <span className="text-[10px] text-blue-200 capitalize">{user?.role}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto px-3">
          {NAV_SECTIONS.map((section) => {
            const visibleItems = section.items.filter(i => hasPermission(i.module));
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.label} className="mb-2">
                <p className="text-[9px] uppercase tracking-widest text-blue-300/50 px-3 mb-1 font-semibold">
                  {section.label}
                </p>
                {visibleItems.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] mb-0.5 transition-all ${
                        isActive
                          ? "bg-white text-[#0F4C8F] font-semibold shadow-sm"
                          : "text-blue-100 hover:bg-white/10 font-normal"
                      }`
                    }
                  >
                    <Icon size={14} />
                    {label}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mx-3 mb-4 px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
