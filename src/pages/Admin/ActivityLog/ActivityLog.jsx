import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { ScrollText } from "lucide-react";

const ACTION_STYLES = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-600",
};

const RESOURCE_TYPES = [
  "all",
  "inquiry",
  "blog",
  "job",
  "testimonial",
  "team",
  "portfolio",
  "newsletter",
  "media",
  "settings",
  "user",
  "seo",
];

const PER_PAGE = 50;

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [resource, setResource] = useState("all");

  const load = (pg = page, res = resource) => {
    setLoading(true);
    const params = new URLSearchParams({ page: pg, limit: PER_PAGE });
    if (res !== "all") params.set("resource", res);
    api
      .get(`/activity-log?${params}`)
      .then((d) => {
        setLogs(d.logs || d);
        setTotal(d.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page, resource);
  }, [page, resource]);

  const handleResourceChange = (val) => {
    setResource(val);
    setPage(1);
    load(1, val);
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Audit trail of all admin actions
          </p>
        </div>
        <select
          value={resource}
          onChange={(e) => handleResourceChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] bg-white"
        >
          {RESOURCE_TYPES.map((r) => (
            <option key={r} value={r}>
              {r === "all" ? "All Resources" : r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading && (
          <Loader />
        )}
        {!loading && logs.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-gray-400">
            <ScrollText size={32} className="mb-3 opacity-30" />
            <p className="text-sm">No activity recorded yet</p>
          </div>
        )}
        {logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["User", "Role", "Action", "Resource", "ID", "Time"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-800 font-medium whitespace-nowrap">
                      {log.user_name || log.user_email || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs capitalize text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {log.user_role || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                          ACTION_STYLES[log.action] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600 capitalize">{log.resource}</td>
                    <td className="px-5 py-3 text-gray-400 font-mono text-xs">
                      {log.resource_id || "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages} · {total} total entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
