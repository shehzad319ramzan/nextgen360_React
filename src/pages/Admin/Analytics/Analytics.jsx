import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import {
  Eye, Users, Activity, TrendingUp, Globe, Link2, Clock,
  MessageSquare, BookOpen, Mail, Briefcase, Plus, Trash2, Zap, MousePointer,
} from "lucide-react";

const input = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [trackedEvents, setTrackedEvents] = useState([]);
  const [days, setDays] = useState(30);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [eventForm, setEventForm] = useState({ name: "", selector: "", page_match: "*", event_type: "click" });
  const [eventError, setEventError] = useState("");

  const fetchAll = () => {
    setLoading(true);
    Promise.all([
      api.get("/analytics"),
      api.get(`/tracking/stats?days=${days}`),
      api.get("/tracking/tracked-events"),
    ]).then(([a, t, e]) => {
      setData(a);
      setTracking(t);
      setTrackedEvents(e);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, [days]);

  if (loading) return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Loader text="Loading analytics..." />
    </div>
  );

  const t = tracking || {};
  const maxDay = Math.max(...(t.viewsByDay || []).map(d => d.views), 1);

  const handleCreateEvent = async () => {
    if (!eventForm.name || !eventForm.selector) return setEventError("Name and selector required");
    setEventError("");
    try {
      await api.post("/tracking/tracked-events", eventForm);
      setEventForm({ name: "", selector: "", page_match: "*", event_type: "click" });
      fetchAll();
    } catch (e) { setEventError(e.message); }
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete this tracked event?")) return;
    await api.delete(`/tracking/tracked-events/${id}`);
    fetchAll();
  };

  const toggleEvent = async (evt) => {
    await api.put(`/tracking/tracked-events/${evt.id}`, { ...evt, active: evt.active ? 0 : 1 });
    fetchAll();
  };

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Page views, visitors, and event tracking</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {["overview", "pages", "events"].map(v => (
              <button key={v} onClick={() => setTab(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${tab === v ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {v}
              </button>
            ))}
          </div>
          {/* Period selector */}
          <select value={days} onChange={e => setDays(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 focus:outline-none">
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* ═══ OVERVIEW TAB ═══ */}
      {tab === "overview" && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Page Views", value: t.totalViews || 0, icon: Eye, color: "bg-[#0F4C8F]" },
              { label: "Unique Visitors", value: t.uniqueVisitors || 0, icon: Users, color: "bg-[#388ECA]" },
              { label: "Live Now", value: t.liveVisitors || 0, icon: Activity, color: "bg-green-500", pulse: t.liveVisitors > 0 },
              { label: "Inquiries", value: data?.totals?.inquiries || 0, icon: MessageSquare, color: "bg-orange-500" },
              { label: "Subscribers", value: data?.totals?.subscribers || 0, icon: Mail, color: "bg-purple-500" },
            ].map(({ label, value, icon: Icon, color, pulse }) => (
              <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className={`p-2 rounded-lg ${color} relative`}>
                  <Icon size={16} className="text-white" />
                  {pulse && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />}
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
                  <p className="text-lg font-bold text-gray-900">{value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Views chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-[#388ECA]" /> Traffic — Last {days} Days
              </h2>
              {(t.viewsByDay || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No data yet — views will appear as visitors browse your site</p>
              ) : (
                <div>
                  <div className="flex items-end gap-[3px] h-36">
                    {t.viewsByDay.map(d => (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer relative">
                        <div className="absolute -top-8 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          {d.date}: {d.views} views, {d.visitors} visitors
                        </div>
                        <div className="w-full rounded-t transition-all group-hover:opacity-100 opacity-80"
                          style={{ height: `${Math.max((d.views / maxDay) * 100, 3)}%`, background: "linear-gradient(to top, #0F4C8F, #388ECA)" }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-gray-400">{t.viewsByDay[0]?.date?.slice(5)}</span>
                    <span className="text-[9px] text-gray-400">{t.viewsByDay[t.viewsByDay.length - 1]?.date?.slice(5)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Top referrers */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <Link2 size={14} className="text-[#388ECA]" /> Top Referrers
              </h2>
              {(t.topReferrers || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No referrer data yet</p>
              ) : (
                <div className="space-y-2.5">
                  {t.topReferrers.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 truncate flex-1 mr-2">{r.referrer.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                      <span className="font-semibold text-gray-800 shrink-0">{r.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Today by hour + events summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[#388ECA]" /> Today by Hour
              </h2>
              {(t.viewsByHour || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No views today yet</p>
              ) : (
                <div className="flex items-end gap-1 h-24">
                  {Array.from({ length: 24 }, (_, h) => {
                    const d = t.viewsByHour.find(v => parseInt(v.hour) === h);
                    const max = Math.max(...t.viewsByHour.map(v => v.views), 1);
                    return (
                      <div key={h} className="flex-1 group cursor-pointer relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          {h}:00 — {d?.views || 0}
                        </div>
                        <div className="w-full rounded-t transition-colors"
                          style={{
                            height: d ? `${Math.max((d.views / max) * 100, 4)}%` : "4%",
                            background: d ? "#388ECA" : "#f3f4f6",
                          }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <Zap size={14} className="text-orange-500" /> Custom Events
              </h2>
              {(t.eventsSummary || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No events tracked yet — set up events in the Events tab</p>
              ) : (
                <div className="space-y-2">
                  {t.eventsSummary.map((e, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-xs font-medium text-gray-800">{e.name}</span>
                        <span className="text-[10px] text-gray-400 ml-2">last: {new Date(e.last_triggered).toLocaleDateString()}</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F4C8F] bg-blue-50 px-2 py-0.5 rounded-full">{e.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ═══ PAGES TAB ═══ */}
      {tab === "pages" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Globe size={16} className="text-[#388ECA]" />
            <h2 className="font-semibold text-gray-800 text-sm">Top Pages — Last {days} Days</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-gray-500 uppercase">Page</th>
                <th className="text-right px-6 py-2.5 text-[10px] font-semibold text-gray-500 uppercase">Views</th>
                <th className="text-right px-6 py-2.5 text-[10px] font-semibold text-gray-500 uppercase">Visitors</th>
                <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-gray-500 uppercase w-48"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(t.topPages || []).length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">No page view data yet</td></tr>
              ) : (
                t.topPages.map((p, i) => {
                  const maxViews = t.topPages[0]?.views || 1;
                  return (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-3">
                        <span className="text-gray-800 font-medium text-xs">{p.path}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-xs font-bold text-gray-900">{p.views.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-xs text-gray-500">{p.visitors.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{
                            width: `${(p.views / maxViews) * 100}%`,
                            background: "linear-gradient(90deg, #0F4C8F, #388ECA)",
                          }} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══ EVENTS TAB ═══ */}
      {tab === "events" && (
        <div className="space-y-5">
          {/* Create event form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-1 flex items-center gap-2">
              <MousePointer size={14} className="text-[#388ECA]" /> Create Tracked Event
            </h2>
            <p className="text-xs text-gray-400 mb-4">Define CSS selectors to automatically track user interactions</p>

            {eventError && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-3">{eventError}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-1">Event Name *</label>
                <input type="text" value={eventForm.name} onChange={e => setEventForm({ ...eventForm, name: e.target.value })}
                  placeholder="e.g. CTA Click" className={input} />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-1">CSS Selector *</label>
                <input type="text" value={eventForm.selector} onChange={e => setEventForm({ ...eventForm, selector: e.target.value })}
                  placeholder="e.g. .hero-cta-btn" className={input} />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-1">Page Match</label>
                <input type="text" value={eventForm.page_match} onChange={e => setEventForm({ ...eventForm, page_match: e.target.value })}
                  placeholder="* for all, /contact for specific" className={input} />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-gray-500 mb-1">Type</label>
                  <select value={eventForm.event_type} onChange={e => setEventForm({ ...eventForm, event_type: e.target.value })} className={input}>
                    <option value="click">Click</option>
                    <option value="submit">Form Submit</option>
                    <option value="focus">Focus</option>
                    <option value="mouseover">Hover</option>
                  </select>
                </div>
                <button onClick={handleCreateEvent}
                  className="flex items-center gap-1.5 bg-[#0F4C8F] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#0d3d75] transition-colors whitespace-nowrap">
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-blue-800 mb-1">How it works:</p>
              <ul className="text-[10px] text-blue-700 space-y-0.5">
                <li>1. Give your event a name (e.g. "Contact Form Submit")</li>
                <li>2. Enter a CSS selector for the element to track (e.g. <code className="bg-blue-100 px-1 rounded">#contact-form button[type="submit"]</code>)</li>
                <li>3. Set page match to restrict to specific pages (* = all pages)</li>
                <li>4. Choose event type: click, form submit, focus, or hover</li>
                <li>5. Events fire automatically when visitors interact with matched elements</li>
              </ul>
            </div>
          </div>

          {/* Tracked events list */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-sm">Active Event Trackers ({trackedEvents.length})</h2>
            </div>
            {trackedEvents.length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No tracked events yet. Create one above.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["Name", "Selector", "Page", "Type", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-2 text-[10px] font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {trackedEvents.map(evt => (
                    <tr key={evt.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-2.5 text-xs font-medium text-gray-800">{evt.name}</td>
                      <td className="px-5 py-2.5"><code className="text-[11px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{evt.selector}</code></td>
                      <td className="px-5 py-2.5 text-xs text-gray-500">{evt.page_match || "*"}</td>
                      <td className="px-5 py-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{evt.event_type}</span></td>
                      <td className="px-5 py-2.5">
                        <button onClick={() => toggleEvent(evt)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium cursor-pointer ${evt.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {evt.active ? "Active" : "Paused"}
                        </button>
                      </td>
                      <td className="px-5 py-2.5">
                        <button onClick={() => deleteEvent(evt.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Events fired summary */}
          {(t.eventsSummary || []).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <Zap size={14} className="text-orange-500" /> Event Results — Last {days} Days
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {t.eventsSummary.map((e, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[#0F4C8F]">{e.count}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">{e.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
