import { useEffect, useState, useRef } from "react";
import Loader from "@/components/ui/loader";
import { Upload, Copy, Trash2, RefreshCw, Image, CheckCircle } from "lucide-react";

const BASE = import.meta.env.VITE_BACKEND_URL_API;

export default function Media() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(null);
  const inputRef = useRef();

  const load = () => {
    setLoading(true);
    const token = localStorage.getItem("nextgen360_token");
    fetch(`${BASE}/media`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setFiles)
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const token = localStorage.getItem("nextgen360_token");
    try {
      const res = await fetch(`${BASE}/media/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (res.ok) load();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = async (filename) => {
    if (!confirm(`Delete ${filename}?`)) return;
    const token = localStorage.getItem("nextgen360_token");
    await fetch(`${BASE}/media/${filename}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const copy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatSize = (bytes) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-0.5">{files.length} files uploaded</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf,.svg"
            onChange={upload}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            <Upload size={14} />
            {uploading ? "Uploading…" : "Upload File"}
          </button>
        </div>
      </div>

      {loading && (
        <Loader />
      )}

      {!loading && files.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-16 text-gray-400">
          <Image size={40} className="mb-3 opacity-30" />
          <p className="text-sm">No files yet. Upload your first file.</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-4 text-sm text-[#388ECA] hover:underline font-medium"
          >
            Upload now
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {files.map((f) => (
          <div
            key={f.filename}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
              {isImage(f.filename) ? (
                <img
                  src={f.url}
                  alt={f.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div className="text-gray-300">
                  <Image size={32} />
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copy(f.url)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
                  title="Copy URL"
                >
                  {copied === f.url ? (
                    <CheckCircle size={15} className="text-green-600" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
                <button
                  onClick={() => remove(f.filename)}
                  className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="p-2.5">
              <p className="text-xs text-gray-700 truncate font-medium">{f.filename}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formatSize(f.size)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
