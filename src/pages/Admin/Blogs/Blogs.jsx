import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { Plus, Edit2, Trash2, Eye, EyeOff, Upload, Image } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";

const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8F]";
const emptyForm = { title: "", excerpt: "", content: "", cover_image: "", status: "draft", seo_title: "", seo_description: "", seo_keywords: "" };

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchBlogs = () => api.get("/blogs").then(setBlogs).catch(() => {});
  useEffect(() => { fetchBlogs(); }, []);

  const openNew = () => { setForm(emptyForm); setEditId(null); setView("new"); };
  const openEdit = (b) => {
    setForm({ title: b.title, excerpt: b.excerpt || "", content: b.content || "", cover_image: b.cover_image || "", status: b.status, seo_title: b.seo_title || "", seo_description: b.seo_description || "", seo_keywords: b.seo_keywords || "" });
    setEditId(b.id);
    setView("edit");
  };

  const handleSave = async () => {
    if (!form.title) return;
    setSaving(true);
    try {
      if (editId) await api.put(`/blogs/${editId}`, form);
      else await api.post("/blogs", form);
      fetchBlogs();
      setView("list");
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    await api.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  const togglePublish = async (b) => {
    await api.put(`/blogs/${b.id}`, { status: b.status === "published" ? "draft" : "published" });
    fetchBlogs();
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await api.upload("/media/upload", file);
      setForm(prev => ({ ...prev, cover_image: data.url }));
    } catch {}
    setUploading(false);
  };

  if (view !== "list") {
    return (
      <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")} className="text-sm text-gray-500 hover:text-gray-800">&larr; Back</button>
          <h1 className="text-xl font-bold text-gray-900">{editId ? "Edit Blog" : "New Blog"}</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 max-w-4xl">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Blog post title" className={input} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2} placeholder="Short summary shown in blog listings" className={`${input} resize-none`} />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Cover Image</label>
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <input type="text" value={form.cover_image}
                  onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                  placeholder="Image URL or upload a file" className={input} />
              </div>
              <label className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${uploading ? "bg-gray-200 text-gray-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                <Upload size={14} />
                {uploading ? "Uploading..." : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploading} />
              </label>
            </div>
            {form.cover_image && (
              <div className="mt-2 relative inline-block">
                <img src={form.cover_image} alt="Cover preview" className="h-32 rounded-lg object-cover border"
                  onError={(e) => e.target.style.display = "none"} />
              </div>
            )}
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(val) => setForm(prev => ({ ...prev, content: val }))}
              placeholder="Write your blog content here..."
              minHeight={300}
            />
            <p className="text-xs text-gray-400 mt-1">Use the toolbar to format text, add images, links, and videos. Images are automatically uploaded to the server.</p>
          </div>

          {/* SEO Section */}
          <div className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Settings</span>
              <span className="text-[10px] text-gray-400">— for search engines</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Meta Title</label>
                <span className={`text-[10px] ${(form.seo_title || form.title).length >= 50 && (form.seo_title || form.title).length <= 60 ? "text-green-600" : "text-orange-500"}`}>
                  {(form.seo_title || form.title).length}/60
                </span>
              </div>
              <input type="text" value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                placeholder={form.title || "Leave blank to use blog title"}
                className={input} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Meta Description</label>
                <span className={`text-[10px] ${(form.seo_description || form.excerpt).length >= 150 && (form.seo_description || form.excerpt).length <= 160 ? "text-green-600" : "text-orange-500"}`}>
                  {(form.seo_description || form.excerpt).length}/160
                </span>
              </div>
              <textarea value={form.seo_description}
                onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                rows={2} placeholder={form.excerpt || "Leave blank to use excerpt"}
                className={`${input} resize-none`} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">SEO Keywords</label>
              <input type="text" value={form.seo_keywords}
                onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className={input} />
            </div>
            {/* Google Preview */}
            <div className="bg-white border rounded-lg p-3 mt-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-semibold">Google Preview</p>
              <p className="text-xs text-gray-500">https://nextgen360.info/blog/...</p>
              <p className="text-[#1a0dab] text-sm font-medium truncate hover:underline cursor-pointer">
                {form.seo_title || form.title || "Blog post title"}
              </p>
              <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                {form.seo_description || form.excerpt || "Blog post description will appear here..."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="status" value="draft" checked={form.status === "draft"}
                  onChange={(e) => setForm({ ...form, status: e.target.value })} />
                Save as Draft
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="status" value="published" checked={form.status === "published"}
                  onChange={(e) => setForm({ ...form, status: e.target.value })} />
                Publish
              </label>
            </div>
            <button onClick={handleSave} disabled={saving || !form.title}
              className="bg-[#0F4C8F] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Blogs ({blogs.length})</h1>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#0F4C8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {blogs.length === 0 && (
          <p className="p-8 text-sm text-gray-400 text-center">No blog posts yet. Create your first one!</p>
        )}
        <div className="divide-y">
          {blogs.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {b.cover_image && (
                  <img src={b.cover_image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0 border"
                    onError={(e) => e.target.style.display = "none"} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-gray-800 truncate">{b.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {b.author_name} &middot; {new Date(b.created_at).toLocaleDateString()}
                    {b.excerpt && ` \u00B7 ${b.excerpt.slice(0, 60)}...`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  b.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {b.status}
                </span>
                <button onClick={() => togglePublish(b)} title={b.status === "published" ? "Unpublish" : "Publish"} className="text-gray-400 hover:text-blue-600 transition-colors">
                  {b.status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => openEdit(b)} className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(b.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
