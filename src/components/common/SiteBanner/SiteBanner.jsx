import { useEffect, useState } from "react";

const TYPE_STYLES = {
  info: "bg-[#0F4C8F] text-white",
  warning: "bg-yellow-400 text-yellow-900",
  success: "bg-green-500 text-white",
};

export default function SiteBanner() {
  const [settings, setSettings] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
      .then(r => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  if (dismissed || !settings || settings.banner_active !== "true" || !settings.banner_text) return null;

  return (
    <div className={`w-full px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-medium ${TYPE_STYLES[settings.banner_type] || TYPE_STYLES.info}`}
      style={{ fontFamily: "Poppins, sans-serif" }}>
      <span>{settings.banner_text}</span>
      <button onClick={() => setDismissed(true)} className="ml-auto opacity-70 hover:opacity-100 text-lg leading-none">×</button>
    </div>
  );
}
