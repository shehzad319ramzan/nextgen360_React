import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { Mail, Download, Trash2, ToggleLeft, ToggleRight, BellRing, Save } from "lucide-react";

const BASE = import.meta.env.VITE_BACKEND_URL_API;
const TABS = ["Subscribers", "Popup Settings"];

export default function Newsletter() {
  const [activeTab, setActiveTab] = useState("Subscribers");

  // ── Subscribers state ──
  const [data, setData] = useState({ subscribers: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/newsletter").then((d) => {
      const list = Array.isArray(d) ? d : (d.subscribers || []);
      setData({ subscribers: list, total: Array.isArray(d) ? list.length : (d.total || list.length) });
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const toggle = async (sub) => {
    await api.put(`/newsletter/${sub.id}`, { active: !sub.active });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Remove this subscriber?")) return;
    await api.delete(`/newsletter/${id}`);
    load();
  };

  const exportCSV = () => {
    const link = document.createElement("a");
    link.href = `${BASE}/newsletter/export`;
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── Popup settings state ──
  const [popupForm, setPopupForm] = useState({
    newsletter_popup_enabled: "true",
    newsletter_popup_heading: "Stay in the loop",
    newsletter_popup_subtext: "Get notified about events, offers...",
  });
  const [popupSaving, setPopupSaving] = useState(false);
  const [popupSaved, setPopupSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then((d) => setPopupForm((f) => ({ ...f, ...d }))).catch(() => {});
  }, []);

  const savePopup = async () => {
    setPopupSaving(true);
    setPopupSaved(false);
    try {
      await api.put("/settings", popupForm);
      setPopupSaved(true);
      setTimeout(() => setPopupSaved(false), 3000);
    } finally {
      setPopupSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Newsletter</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage subscribers and the signup popup</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Subscribers Tab ── */}
      {activeTab === "Subscribers" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{data.total} active subscribers</p>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {loading && <Loader />}
            {!loading && data.subscribers.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <Mail size={32} className="mb-3 opacity-30" />
                <p className="text-sm">No subscribers yet</p>
              </div>
            )}
            {data.subscribers.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Email", "Name", "Source", "Subscribed", "Status", ""].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-gray-800 font-medium">{sub.email}</td>
                        <td className="px-5 py-3 text-gray-600">{sub.name || "—"}</td>
                        <td className="px-5 py-3 text-gray-500 capitalize">{sub.source}</td>
                        <td className="px-5 py-3 text-gray-500">
                          {new Date(sub.created_at).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                            sub.active ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-400 border-gray-200"
                          }`}>
                            {sub.active ? "Active" : "Unsubscribed"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggle(sub)}
                              className="p-1.5 text-gray-400 hover:text-[#0F4C8F] rounded-lg hover:bg-gray-100 transition-colors"
                              title="Toggle"
                            >
                              {sub.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </button>
                            <button
                              onClick={() => remove(sub.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Popup Settings Tab ── */}
      {activeTab === "Popup Settings" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#308FCF] rounded-lg">
                <BellRing size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Newsletter Signup Popup</p>
                <p className="text-xs text-gray-500">Modal shown to visitors prompting newsletter signup</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className={`flex items-start gap-4 p-4 rounded-xl border ${popupForm.newsletter_popup_enabled === "true" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Show newsletter signup popup to visitors</p>
                  <p className="text-xs text-gray-500 mt-0.5">Displayed once per visitor (dismissable)</p>
                </div>
                <div
                  onClick={() => setPopupForm({ ...popupForm, newsletter_popup_enabled: popupForm.newsletter_popup_enabled === "true" ? "false" : "true" })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${popupForm.newsletter_popup_enabled === "true" ? "bg-[#308FCF]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${popupForm.newsletter_popup_enabled === "true" ? "translate-x-5" : ""}`} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Heading</label>
                <input
                  type="text"
                  value={popupForm.newsletter_popup_heading}
                  onChange={(e) => setPopupForm({ ...popupForm, newsletter_popup_heading: e.target.value })}
                  placeholder="Stay in the loop"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Subtext</label>
                <textarea
                  rows={3}
                  value={popupForm.newsletter_popup_subtext}
                  onChange={(e) => setPopupForm({ ...popupForm, newsletter_popup_subtext: e.target.value })}
                  placeholder="Get notified about events, offers..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={savePopup}
            disabled={popupSaving}
            className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {popupSaving ? "Saving…" : popupSaved ? "Saved!" : "Save Popup Settings"}
          </button>
        </div>
      )}
    </div>
  );
}
