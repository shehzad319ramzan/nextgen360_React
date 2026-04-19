import { useEffect, useState } from "react";

export default function MaintenanceMode({ children }) {
  const [maintenance, setMaintenance] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
      .then(r => r.json())
      .then(d => {
        setMaintenance(d.maintenance_mode === "true");
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, []);

  if (!checked) return null; // Wait before rendering anything

  if (maintenance) {
    return (
      <div className="min-h-screen bg-[#0F4C8F] flex flex-col items-center justify-center text-white text-center px-6"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-2xl">T</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">We'll be back soon</h1>
        <p className="text-blue-200 max-w-md text-sm leading-relaxed">
          Tech Solutions Pro is currently undergoing scheduled maintenance. We'll be back online shortly. Thank you for your patience.
        </p>
        <p className="text-blue-300 text-xs mt-6">tech-solutionspro.com</p>
      </div>
    );
  }

  return children;
}
