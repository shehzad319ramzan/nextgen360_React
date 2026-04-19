import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2, Edit2, Shield, X, Check } from "lucide-react";

const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8F]";

const MODULE_GROUPS = [
  {
    label: "Overview",
    modules: [
      { key: "dashboard", label: "Dashboard" },
      { key: "analytics", label: "Analytics" },
    ],
  },
  {
    label: "Content",
    modules: [
      { key: "inquiries", label: "Inquiries" },
      { key: "blogs", label: "Blogs" },
      { key: "jobs", label: "Job Openings" },
      { key: "job-applications", label: "Applications" },
      { key: "testimonials", label: "Testimonials" },
      { key: "team", label: "Team" },
      { key: "portfolio", label: "Portfolio" },
      { key: "case-studies", label: "Case Studies" },
    ],
  },
  {
    label: "Marketing",
    modules: [
      { key: "seo", label: "SEO" },
      { key: "robots-txt", label: "Robots.txt" },
      { key: "htaccess", label: ".htaccess" },
      { key: "newsletter", label: "Newsletter" },
    ],
  },
  {
    label: "System",
    modules: [
      { key: "media", label: "Media Library" },
      { key: "solutions", label: "Solutions" },
      { key: "users", label: "Users & RBAC" },
      { key: "settings", label: "Settings" },
      { key: "activity-log", label: "Activity Log" },
    ],
  },
];

const ALL_MODULES = MODULE_GROUPS.flatMap(g => g.modules.map(m => m.key));

export default function Users() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPerms, setShowPerms] = useState(null); // user id for permissions modal
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "seo" });
  const [permsForm, setPermsForm] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => api.get("/auth/users").then(setUsers).catch(() => {});
  useEffect(() => { fetchUsers(); }, []);

  const openCreate = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", role: "seo" });
    setError("");
    setShowModal(true);
  };

  const openEdit = (u) => {
    setEditUser(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setError("");
    setShowModal(true);
  };

  const openPermissions = (u) => {
    setShowPerms(u);
    setPermsForm(u.permissions ? [...u.permissions] : [...ALL_MODULES]);
  };

  const handleSave = async () => {
    if (!form.name || !form.email || (!editUser && !form.password)) return setError("Name, email and password required");
    setSaving(true);
    setError("");
    try {
      if (editUser) {
        const payload = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await api.put(`/auth/users/${editUser.id}`, payload);
      } else {
        await api.post("/auth/users", form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/auth/users/${id}`);
    fetchUsers();
  };

  const togglePerm = (key) => {
    setPermsForm(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const toggleGroup = (modules) => {
    const keys = modules.map(m => m.key);
    const allSelected = keys.every(k => permsForm.includes(k));
    if (allSelected) {
      setPermsForm(prev => prev.filter(k => !keys.includes(k)));
    } else {
      setPermsForm(prev => [...new Set([...prev, ...keys])]);
    }
  };

  const selectAll = () => setPermsForm([...ALL_MODULES]);
  const selectNone = () => setPermsForm([]);

  const savePermissions = async () => {
    setSaving(true);
    try {
      // null = full access (superadmin), empty array = no access
      const perms = permsForm.length === ALL_MODULES.length ? null : permsForm;
      await api.put(`/auth/users/${showPerms.id}`, { permissions: perms });
      setShowPerms(null);
      fetchUsers();
    } catch {}
    setSaving(false);
  };

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Users & Permissions</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage users and control module access</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-[#0F4C8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] transition-colors">
          <Plus size={16} /> New User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {["Name", "Email", "Role", "Permissions", "Created", "Actions"].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{u.name}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    u.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {!u.permissions ? (
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">Full Access</span>
                  ) : (
                    <span className="text-xs text-gray-500">
                      {u.permissions.length} of {ALL_MODULES.length} modules
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openPermissions(u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      <Shield size={13} /> RBAC
                    </button>
                    <button onClick={() => openEdit(u)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                      <Edit2 size={13} /> Edit
                    </button>
                    {u.id !== currentUser?.id && (
                      <button onClick={() => handleDelete(u.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                        <Trash2 size={13} /> Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-800">{editUser ? "Edit User" : "New User"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {editUser ? "New Password (leave blank to keep)" : "Password"}
                </label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={input} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={input}>
                  <option value="seo">SEO Team</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 border text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#0F4C8F] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
                {saving ? "Saving..." : editUser ? "Update User" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPerms && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto p-4 sm:p-6">
          <div className="min-h-full flex items-start justify-center sm:items-center">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-6 border-b bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="font-semibold text-gray-800">Module Permissions</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {showPerms.name} ({showPerms.email}) &middot; <span className="capitalize">{showPerms.role}</span>
                    </p>
                  </div>
                  <button onClick={() => setShowPerms(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={selectAll}
                    className="px-3 py-1.5 text-xs rounded-lg bg-green-50 text-green-700 hover:bg-green-100 font-medium transition-colors">
                    Select All
                  </button>
                  <button onClick={selectNone}
                    className="px-3 py-1.5 text-xs rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium transition-colors">
                    Deselect All
                  </button>
                  <div className="flex-1" />
                  <span className="text-xs text-gray-400 self-center">{permsForm.length}/{ALL_MODULES.length} selected</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {MODULE_GROUPS.map((group) => {
                    const groupKeys = group.modules.map(m => m.key);
                    const allSelected = groupKeys.every(k => permsForm.includes(k));
                    const someSelected = groupKeys.some(k => permsForm.includes(k));
                    return (
                      <div key={group.label} className="border rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={allSelected} ref={el => { if (el) el.indeterminate = someSelected && !allSelected; }}
                              onChange={() => toggleGroup(group.modules)}
                              className="rounded border-gray-300 text-[#0F4C8F] focus:ring-[#0F4C8F]" />
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{group.label}</span>
                          </label>
                          <span className="text-[10px] text-gray-400">
                            {groupKeys.filter(k => permsForm.includes(k)).length}/{groupKeys.length}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                          {group.modules.map((mod) => (
                            <label key={mod.key}
                              className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer border-b sm:border-r last:border-r-0 transition-colors ${
                                permsForm.includes(mod.key) ? "bg-blue-50/50" : "hover:bg-gray-50"
                              }`}>
                              <input type="checkbox" checked={permsForm.includes(mod.key)}
                                onChange={() => togglePerm(mod.key)}
                                className="rounded border-gray-300 text-[#0F4C8F] focus:ring-[#0F4C8F]" />
                              <span className={`text-sm ${permsForm.includes(mod.key) ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                                {mod.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {permsForm.length === ALL_MODULES.length && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-xs text-green-700 flex items-center gap-2">
                    <Check size={14} />
                    Full access - all modules selected. Permissions will be stored as unrestricted.
                  </div>
                )}

                {permsForm.length === 0 && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-xs text-red-700">
                    No modules selected. This user won't be able to access any admin features.
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-white">
                <div className="flex gap-3">
                  <button onClick={() => setShowPerms(null)} className="flex-1 border text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={savePermissions} disabled={saving}
                    className="flex-1 bg-[#0F4C8F] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                    <Shield size={14} />
                    {saving ? "Saving..." : "Save Permissions"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
