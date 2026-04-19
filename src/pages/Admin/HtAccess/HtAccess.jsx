import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { CheckCircle, AlertCircle, Download } from "lucide-react";

const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8F]";

export default function HtAccess() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seo/_htaccess").then(d => setContent(d.content)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/seo/_htaccess", { content });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ".htaccess";
    a.click();
  };

  if (loading) return <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}><Loader /></div>;

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">.htaccess</h1>
          <p className="text-sm text-gray-500 mt-0.5">Apache server configuration for redirects, security headers, and URL rewriting</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
          <button onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={13} /> Download
          </button>
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
            placeholder="RewriteEngine On&#10;RewriteCond %{HTTPS} off&#10;RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]" />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Guide</label>
            <div className="text-xs text-gray-600 space-y-2.5">
              <p><strong className="text-gray-800">RewriteEngine On</strong> — enable URL rewriting</p>
              <p><strong className="text-gray-800">Force HTTPS</strong> — redirect HTTP to HTTPS</p>
              <p><strong className="text-gray-800">www redirect</strong> — redirect www to non-www (or vice versa)</p>
              <p><strong className="text-gray-800">Security headers</strong> — X-Frame-Options, HSTS, etc.</p>
              <p><strong className="text-gray-800">Caching</strong> — set browser cache durations for assets</p>
              <p><strong className="text-gray-800">Compression</strong> — enable GZIP for faster loading</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <AlertCircle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700">Changes are saved to database. Download the file and deploy it to your Apache server root for the rules to take effect.</p>
            </div>
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
