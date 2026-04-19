import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { MessageSquare, BookOpen, TrendingUp, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  new: "bg-orange-100 text-orange-700",
  read: "bg-blue-50 text-blue-600",
  "in-progress": "bg-yellow-100 text-yellow-700",
  replied: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const StatCard = ({ icon: Icon, label, value, accent, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
  >
    <div className={`p-3 rounded-xl ${accent}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-0.5">{value ?? "—"}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentInquiries, setRecentInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/contact-us?limit=6").then((d) => {
      const list = Array.isArray(d) ? d : (d.inquiries || []);
      setRecentInquiries(list.slice(0, 6));
      setStats((s) => ({
        ...s,
        totalInquiries: Array.isArray(d) ? list.length : (d.total || list.length),
        newInquiries: list.filter((i) => i.status === "new").length,
      }));
    }).catch(() => {});

    api.get("/blogs").then((d) => {
      setStats((s) => ({
        ...s,
        totalBlogs: d.length,
        publishedBlogs: d.filter((b) => b.status === "published").length,
      }));
    }).catch(() => {});
  }, []);

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here's what's happening</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Inbox}
          label="Total Inquiries"
          value={stats.totalInquiries}
          accent="bg-[#0F4C8F]"
          onClick={() => navigate("/admin/inquiries")}
        />
        <StatCard
          icon={MessageSquare}
          label="New Inquiries"
          value={stats.newInquiries}
          accent="bg-orange-500"
          onClick={() => navigate("/admin/inquiries")}
        />
        <StatCard
          icon={BookOpen}
          label="Total Blogs"
          value={stats.totalBlogs}
          accent="bg-[#388ECA]"
          onClick={() => navigate("/admin/blogs")}
        />
        <StatCard
          icon={TrendingUp}
          label="Published"
          value={stats.publishedBlogs}
          accent="bg-green-500"
          onClick={() => navigate("/admin/blogs")}
        />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-800 text-sm">Recent Inquiries</h2>
            <p className="text-xs text-gray-400 mt-0.5">Latest submissions from the contact form</p>
          </div>
          <button
            onClick={() => navigate("/admin/inquiries")}
            className="text-xs text-[#388ECA] font-medium hover:underline"
          >
            View all →
          </button>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Inbox size={32} className="mb-3 opacity-30" />
            <p className="text-sm">No inquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => navigate("/admin/inquiries")}
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium text-gray-800 ${inq.status === "new" ? "font-semibold" : ""}`}>
                      {inq.name}
                    </p>
                    {inq.status === "new" && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{inq.email}{inq.category ? ` · ${inq.category}` : ""}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_STYLES[inq.status] || "bg-gray-100 text-gray-500"}`}>
                    {inq.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(inq.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
