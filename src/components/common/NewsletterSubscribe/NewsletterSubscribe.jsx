import { useState } from "react";

export default function NewsletterSubscribe({ className = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      setStatus("success");
      setMessage(data.message || "Subscribed!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return <p className={`text-green-400 text-sm font-medium ${className}`}>✓ {message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`} style={{ fontFamily: "Poppins, sans-serif" }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-white text-[#0F4C8F] font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-red-300 text-xs mt-1">{message}</p>}
    </form>
  );
}
