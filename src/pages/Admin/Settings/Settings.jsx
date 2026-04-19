import { useEffect, useState } from "react";
import { api } from "@/api/client";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Save, Send, Eye, EyeOff, Mail, Server, CheckCircle, XCircle,
  Globe, AlertTriangle, Linkedin, Twitter, Facebook, Instagram, Cookie, ShieldCheck,
  Image as ImageIcon, Upload, Trash2,
} from "lucide-react";

const TABS = ["Email Settings", "Site Settings", "Cookie Consent", "Privacy Policy"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Email Settings");

  // --- Email Settings state ---
  const [emailForm, setEmailForm] = useState({
    smtp_host: "",
    smtp_port: "587",
    smtp_secure: "false",
    smtp_user: "",
    smtp_pass: "",
    notify_email: "",
    from_name: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [emailSaving, setEmailSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // --- Site Settings state ---
  const [siteForm, setSiteForm] = useState({
    site_phone: "",
    site_email: "",
    site_address: "",
    social_linkedin: "",
    social_twitter: "",
    social_facebook: "",
    social_instagram: "",
    ga_tracking_id: "",
    gtm_id: "",
    fb_pixel_id: "",
    tiktok_pixel_id: "",
    custom_head_scripts: "",
    custom_footer_scripts: "",
    maintenance_mode: "false",
    banner_active: "false",
    banner_text: "",
    banner_type: "info",
    logo_light: "",
    logo_dark: "",
  });
  const [siteSaving, setSiteSaving] = useState(false);
  const [siteSaved, setSiteSaved] = useState(false);
  const [logoUploading, setLogoUploading] = useState({ light: false, dark: false });

  const handleLogoUpload = async (which, file) => {
    if (!file) return;
    setLogoUploading((s) => ({ ...s, [which]: true }));
    try {
      const res = await api.upload("/media/upload", file);
      const key = which === "light" ? "logo_light" : "logo_dark";
      setSiteForm((f) => ({ ...f, [key]: res.url }));
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setLogoUploading((s) => ({ ...s, [which]: false }));
    }
  };

  // --- Cookies & Popup state ---
  const [cpForm, setCpForm] = useState({
    cookie_consent_enabled: "true",
    cookie_banner_title: "We value your privacy",
    cookie_policy_url: "/privacy-policy",
    cookie_banner_message: "",
    cookie_banner_description: "",
    cookie_accept_text: "Accept All",
    cookie_decline_text: "Reject All",
    cookie_necessary_label: "Strictly Necessary",
    cookie_analytics_label: "Analytics & Performance",
    cookie_marketing_label: "Marketing & Advertising",
    newsletter_popup_enabled: "true",
    newsletter_popup_heading: "Stay in the loop",
    newsletter_popup_subtext: "Get notified about events, offers...",
  });
  const [cpSaving, setCpSaving] = useState(false);
  const [cpSaved, setCpSaved] = useState(false);

  // --- Privacy Policy state ---
  const [ppForm, setPpForm] = useState({
    privacy_policy_title: "Privacy Policy",
    privacy_policy_updated: "",
    privacy_policy_content: "",
  });
  const [ppSaving, setPpSaving] = useState(false);
  const [ppSaved, setPpSaved] = useState(false);

  useEffect(() => {
    api
      .get("/settings")
      .then((d) => {
        setEmailForm((f) => ({ ...f, ...d }));
        setSiteForm((f) => ({ ...f, ...d }));
        setCpForm((f) => ({ ...f, ...d }));
        setPpForm((f) => ({ ...f, ...d }));
      })
      .catch(() => {});
  }, []);

  const handlePpSave = async () => {
    setPpSaving(true);
    setPpSaved(false);
    try {
      await api.put("/settings", ppForm);
      setPpSaved(true);
      setTimeout(() => setPpSaved(false), 3000);
    } finally {
      setPpSaving(false);
    }
  };

  const handleCpSave = async () => {
    setCpSaving(true);
    setCpSaved(false);
    try {
      await api.put("/settings", cpForm);
      setCpSaved(true);
      setTimeout(() => setCpSaved(false), 3000);
    } finally {
      setCpSaving(false);
    }
  };

  // Email Settings handlers
  const handleEmailSave = async () => {
    setEmailSaving(true);
    setEmailSaved(false);
    try {
      await api.put("/settings", emailForm);
      setEmailSaved(true);
      setTimeout(() => setEmailSaved(false), 3000);
    } finally {
      setEmailSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await api.post("/settings/test-email", {});
      setTestResult({ ok: true, message: res.message });
    } catch (err) {
      setTestResult({ ok: false, message: err.message || "Test failed" });
    } finally {
      setTesting(false);
    }
  };

  // Site Settings handler
  const handleSiteSave = async () => {
    setSiteSaving(true);
    setSiteSaved(false);
    try {
      await api.put("/settings", siteForm);
      setSiteSaved(true);
      setTimeout(() => setSiteSaved(false), 3000);
    } finally {
      setSiteSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your site and email configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Email Settings Tab ── */}
      {activeTab === "Email Settings" && (
        <>
          {/* SMTP Configuration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#0F4C8F] rounded-lg">
                <Server size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">SMTP Configuration</p>
                <p className="text-xs text-gray-500">Outgoing email server settings</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">SMTP Host</label>
                  <input
                    type="text"
                    value={emailForm.smtp_host}
                    onChange={(e) => setEmailForm({ ...emailForm, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Port</label>
                  <input
                    type="number"
                    value={emailForm.smtp_port}
                    onChange={(e) => setEmailForm({ ...emailForm, smtp_port: e.target.value })}
                    placeholder="587"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Username / Email</label>
                <input
                  type="email"
                  value={emailForm.smtp_user}
                  onChange={(e) => setEmailForm({ ...emailForm, smtp_user: e.target.value })}
                  placeholder="your-email@gmail.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Password / App Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={emailForm.smtp_pass}
                    onChange={(e) => setEmailForm({ ...emailForm, smtp_pass: e.target.value })}
                    placeholder="Enter app password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">For Gmail: use an App Password (not your account password)</p>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() =>
                    setEmailForm({
                      ...emailForm,
                      smtp_secure: emailForm.smtp_secure === "true" ? "false" : "true",
                    })
                  }
                  className={`relative w-9 h-5 rounded-full transition-colors ${
                    emailForm.smtp_secure === "true" ? "bg-[#0F4C8F]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      emailForm.smtp_secure === "true" ? "translate-x-4" : ""
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-700">Use SSL/TLS (port 465)</span>
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#388ECA] rounded-lg">
                <Mail size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Notification Settings</p>
                <p className="text-xs text-gray-500">Where inquiry emails are delivered</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Notify Email</label>
                <input
                  type="email"
                  value={emailForm.notify_email}
                  onChange={(e) => setEmailForm({ ...emailForm, notify_email: e.target.value })}
                  placeholder="admin@tech-solutionspro.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">New inquiry notifications will be sent to this address</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">From Name</label>
                <input
                  type="text"
                  value={emailForm.from_name}
                  onChange={(e) => setEmailForm({ ...emailForm, from_name: e.target.value })}
                  placeholder="NextGen360 Website"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {testResult && (
            <div
              className={`flex items-start gap-3 p-4 rounded-xl mb-5 text-sm ${
                testResult.ok
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {testResult.ok ? (
                <CheckCircle size={16} className="shrink-0 mt-0.5" />
              ) : (
                <XCircle size={16} className="shrink-0 mt-0.5" />
              )}
              {testResult.message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleEmailSave}
              disabled={emailSaving}
              className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
            >
              <Save size={15} />
              {emailSaving ? "Saving…" : emailSaved ? "Saved!" : "Save Settings"}
            </button>

            <button
              onClick={handleTest}
              disabled={testing}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
            >
              <Send size={15} />
              {testing ? "Sending…" : "Send Test Email"}
            </button>
          </div>
        </>
      )}

      {/* ── Site Settings Tab ── */}
      {activeTab === "Site Settings" && (
        <>
          {/* Branding / Logo */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#308FCF] rounded-lg">
                <ImageIcon size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Branding & Logo</p>
                <p className="text-xs text-gray-500">Logos shown in the header and footer</p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { which: "light", key: "logo_light", label: "Light Logo", help: "Used on transparent header & footer (dark backgrounds)", bg: "bg-[#308FCF]" },
                { which: "dark", key: "logo_dark", label: "Dark Logo", help: "Used on scrolled / light backgrounds", bg: "bg-gray-100" },
              ].map(({ which, key, label, help, bg }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
                  <div className={`${bg} border border-gray-200 rounded-xl p-5 flex items-center justify-center min-h-[110px] mb-2`}>
                    {siteForm[key] ? (
                      <img src={siteForm[key]} alt={label} className="max-h-16 max-w-full object-contain" />
                    ) : (
                      <span className="text-xs text-gray-400">No logo uploaded</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Upload size={13} />
                      {logoUploading[which] ? "Uploading…" : siteForm[key] ? "Replace" : "Upload"}
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(which, e.target.files?.[0])}
                      />
                    </label>
                    {siteForm[key] && (
                      <button
                        type="button"
                        onClick={() => setSiteForm({ ...siteForm, [key]: "" })}
                        className="px-3 py-2 border border-red-200 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
                        aria-label="Remove logo"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">{help}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#0F4C8F] rounded-lg">
                <Globe size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Contact Information</p>
                <p className="text-xs text-gray-500">Phone, email and address shown on the site</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={siteForm.site_phone}
                    onChange={(e) => setSiteForm({ ...siteForm, site_phone: e.target.value })}
                    placeholder="+44 115 000 0000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={siteForm.site_email}
                    onChange={(e) => setSiteForm({ ...siteForm, site_email: e.target.value })}
                    placeholder="admin@tech-solutionspro.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Address</label>
                <input
                  type="text"
                  value={siteForm.site_address}
                  onChange={(e) => setSiteForm({ ...siteForm, site_address: e.target.value })}
                  placeholder="123 Street Name, Nottingham, NG1 1AB"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#388ECA] rounded-lg">
                <Linkedin size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Social Media Links</p>
                <p className="text-xs text-gray-500">Links shown in the footer and contact sections</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {[
                { key: "social_linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/…" },
                { key: "social_twitter", label: "Twitter / X", icon: Twitter, placeholder: "https://twitter.com/…" },
                { key: "social_facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/…" },
                { key: "social_instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/…" },
              ].map(({ key, label, icon: Icon, placeholder }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      type="url"
                      value={siteForm[key]}
                      onChange={(e) => setSiteForm({ ...siteForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking & Scripts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Globe size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Tracking & Scripts</p>
                <p className="text-xs text-gray-500">Analytics pixels and custom header/footer code</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Google Analytics Measurement ID</label>
                  <input type="text" value={siteForm.ga_tracking_id}
                    onChange={(e) => setSiteForm({ ...siteForm, ga_tracking_id: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">e.g. G-G6FSF491RP</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Google Tag Manager Container ID</label>
                  <input type="text" value={siteForm.gtm_id}
                    onChange={(e) => setSiteForm({ ...siteForm, gtm_id: e.target.value })}
                    placeholder="GTM-XXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">Loads gtag.js container</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Facebook Pixel ID</label>
                  <input type="text" value={siteForm.fb_pixel_id}
                    onChange={(e) => setSiteForm({ ...siteForm, fb_pixel_id: e.target.value })}
                    placeholder="123456789012345"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">Meta/Facebook tracking pixel</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">TikTok Pixel ID</label>
                  <input type="text" value={siteForm.tiktok_pixel_id}
                    onChange={(e) => setSiteForm({ ...siteForm, tiktok_pixel_id: e.target.value })}
                    placeholder="CXXXXXXXXXXXXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">TikTok Events API pixel</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Custom Head Scripts <span className="text-gray-400 font-normal">(injected before &lt;/head&gt;)</span>
                </label>
                <textarea value={siteForm.custom_head_scripts}
                  onChange={(e) => setSiteForm({ ...siteForm, custom_head_scripts: e.target.value })}
                  rows={5}
                  placeholder={'<!-- Paste any tracking script, schema markup, or custom meta tags here -->\n<script>...</script>\n<meta name="..." content="..." />'}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent resize-none" />
                <p className="text-xs text-gray-400 mt-1">Raw HTML/scripts injected into &lt;head&gt;. Use for Hotjar, Clarity, schema markup, verification tags, etc.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Custom Footer Scripts <span className="text-gray-400 font-normal">(injected before &lt;/body&gt;)</span>
                </label>
                <textarea value={siteForm.custom_footer_scripts}
                  onChange={(e) => setSiteForm({ ...siteForm, custom_footer_scripts: e.target.value })}
                  rows={5}
                  placeholder={'<!-- Paste chat widgets, event scripts, or body-end tracking code here -->\n<script>...</script>'}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent resize-none" />
                <p className="text-xs text-gray-400 mt-1">Raw HTML/scripts injected at the end of the page body. Use for widgets or tracking code that belongs outside the head.</p>
              </div>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertTriangle size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Maintenance Mode</p>
                <p className="text-xs text-gray-500">Control site visibility and banner messages</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              {/* Maintenance toggle */}
              <div className={`flex items-start gap-4 p-4 rounded-xl border ${siteForm.maintenance_mode === "true" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Maintenance Mode</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    Puts the entire website in maintenance mode for all visitors
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSiteForm({
                      ...siteForm,
                      maintenance_mode: siteForm.maintenance_mode === "true" ? "false" : "true",
                    })
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${
                    siteForm.maintenance_mode === "true" ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      siteForm.maintenance_mode === "true" ? "translate-x-5" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Banner section */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Site Banner</p>
                    <p className="text-xs text-gray-500">Show an announcement banner at the top of the site</p>
                  </div>
                  <div
                    onClick={() =>
                      setSiteForm({
                        ...siteForm,
                        banner_active: siteForm.banner_active === "true" ? "false" : "true",
                      })
                    }
                    className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${
                      siteForm.banner_active === "true" ? "bg-[#0F4C8F]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        siteForm.banner_active === "true" ? "translate-x-4" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Banner Text
                    </label>
                    <input
                      type="text"
                      value={siteForm.banner_text}
                      onChange={(e) => setSiteForm({ ...siteForm, banner_text: e.target.value })}
                      placeholder="We're currently undergoing maintenance…"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Banner Type
                    </label>
                    <div className="flex gap-2">
                      {["info", "warning", "success"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSiteForm({ ...siteForm, banner_type: type })}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize border transition-colors ${
                            siteForm.banner_type === type
                              ? type === "info"
                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                : type === "warning"
                                ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                                : "bg-green-50 border-green-300 text-green-700"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSiteSave}
            disabled={siteSaving}
            className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {siteSaving ? "Saving…" : siteSaved ? "Saved!" : "Save Site Settings"}
          </button>
        </>
      )}

      {/* ── Cookie Consent Tab ── */}
      {activeTab === "Cookie Consent" && (
        <>
          {/* Cookie Consent */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#308FCF] rounded-lg">
                <Cookie size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Cookie Consent Banner</p>
                <p className="text-xs text-gray-500">Banner text, buttons and category labels shown to visitors</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Enable toggle */}
              <div className={`flex items-start gap-4 p-4 rounded-xl border ${cpForm.cookie_consent_enabled === "true" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Show cookie consent banner</p>
                  <p className="text-xs text-gray-500 mt-0.5">Display the cookie consent banner to first-time visitors</p>
                </div>
                <div
                  onClick={() => setCpForm({ ...cpForm, cookie_consent_enabled: cpForm.cookie_consent_enabled === "true" ? "false" : "true" })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${cpForm.cookie_consent_enabled === "true" ? "bg-[#308FCF]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${cpForm.cookie_consent_enabled === "true" ? "translate-x-5" : ""}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Banner Title</label>
                  <input
                    type="text"
                    value={cpForm.cookie_banner_title}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_banner_title: e.target.value })}
                    placeholder="We value your privacy"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Policy URL</label>
                  <input
                    type="text"
                    value={cpForm.cookie_policy_url}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_policy_url: e.target.value })}
                    placeholder="/privacy-policy"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Banner Message</label>
                <input
                  type="text"
                  value={cpForm.cookie_banner_message}
                  onChange={(e) => setCpForm({ ...cpForm, cookie_banner_message: e.target.value })}
                  placeholder="Short message for the cookie banner"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Detailed Description</label>
                <textarea
                  rows={4}
                  value={cpForm.cookie_banner_description}
                  onChange={(e) => setCpForm({ ...cpForm, cookie_banner_description: e.target.value })}
                  placeholder="Full description shown when user clicks 'Customise'"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Accept Button Text</label>
                  <input
                    type="text"
                    value={cpForm.cookie_accept_text}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_accept_text: e.target.value })}
                    placeholder="Accept All"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Decline Button Text</label>
                  <input
                    type="text"
                    value={cpForm.cookie_decline_text}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_decline_text: e.target.value })}
                    placeholder="Reject All"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Necessary Label</label>
                  <input
                    type="text"
                    value={cpForm.cookie_necessary_label}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_necessary_label: e.target.value })}
                    placeholder="Strictly Necessary"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Analytics Label</label>
                  <input
                    type="text"
                    value={cpForm.cookie_analytics_label}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_analytics_label: e.target.value })}
                    placeholder="Analytics & Performance"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Marketing Label</label>
                  <input
                    type="text"
                    value={cpForm.cookie_marketing_label}
                    onChange={(e) => setCpForm({ ...cpForm, cookie_marketing_label: e.target.value })}
                    placeholder="Marketing & Advertising"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCpSave}
            disabled={cpSaving}
            className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {cpSaving ? "Saving…" : cpSaved ? "Saved!" : "Save Cookie Settings"}
          </button>
        </>
      )}

      {/* ── Privacy Policy Tab ── */}
      {activeTab === "Privacy Policy" && (
        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="p-2 bg-[#308FCF] rounded-lg">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Privacy Policy Page</p>
                <p className="text-xs text-gray-500">Update the content shown on /privacy-policy</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Page Title</label>
                  <input
                    type="text"
                    value={ppForm.privacy_policy_title}
                    onChange={(e) => setPpForm({ ...ppForm, privacy_policy_title: e.target.value })}
                    placeholder="Privacy Policy"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Last Updated</label>
                  <input
                    type="text"
                    value={ppForm.privacy_policy_updated}
                    onChange={(e) => setPpForm({ ...ppForm, privacy_policy_updated: e.target.value })}
                    placeholder="April 2026"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#308FCF] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Policy Content
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <ReactQuill
                    theme="snow"
                    value={ppForm.privacy_policy_content}
                    onChange={(html) => setPpForm({ ...ppForm, privacy_policy_content: html })}
                    modules={{
                      toolbar: [
                        [{ header: [2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "blockquote"],
                        ["clean"],
                      ],
                    }}
                    style={{ minHeight: 320 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Use H2/H3 headings to separate sections. Content renders as HTML on the public page.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePpSave}
            disabled={ppSaving}
            className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
          >
            <Save size={15} />
            {ppSaving ? "Saving…" : ppSaved ? "Saved!" : "Save Privacy Policy"}
          </button>
        </div>
      )}
    </div>
  );
}
