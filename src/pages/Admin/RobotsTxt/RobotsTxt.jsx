import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8F]";

export default function RobotsTxt() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seo/_robots").then(d => setContent(d.content)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/seo/_robots", { content });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (loading) return <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}><Loader /></div>;

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Robots.txt</h1>
          <p className="text-sm text-gray-500 mt-0.5">Controls which pages search engines can crawl. Changes are served live at /robots.txt</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
          <a href={`${import.meta.env.VITE_BACKEND_URL}/robots.txt`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border text-gray-600 hover:bg-gray-50 transition-colors">
            Preview <ExternalLink size={13} />
          </a>
          <button onClick={handleSave} disabled={saving}
            className="bg-[#0F4C8F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Editor</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={20}
            className={`${input} resize-none font-mono text-xs`}
            placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /admin/" />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Guide</label>
            <div className="text-xs text-gray-600 space-y-2.5">
              <p><strong className="text-gray-800">User-agent: *</strong> — applies to all crawlers</p>
              <p><strong className="text-gray-800">Allow: /</strong> — allow crawling of all pages</p>
              <p><strong className="text-gray-800">Disallow: /admin/</strong> — block admin pages</p>
              <p><strong className="text-gray-800">Disallow: /api/</strong> — block API endpoints</p>
              <p><strong className="text-gray-800">Sitemap:</strong> — tell crawlers where your sitemap is</p>
              <p><strong className="text-gray-800">Crawl-delay: 10</strong> — seconds between requests (optional)</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Preview</label>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-auto max-h-52">
              <pre className="whitespace-pre-wrap">{content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
