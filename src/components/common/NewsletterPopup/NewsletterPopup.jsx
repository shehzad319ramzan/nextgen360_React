import { useEffect, useState } from "react";
import { X, Mail } from "lucide-react";
import styles from "./NewsletterPopup.module.scss";

const STORAGE_KEY = "tsp_newsletter_popup";

const NewsletterPopup = () => {
    const [cfg, setCfg] = useState(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(""); // "", "sending", "success", "error"

    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY)) return;
        let timer;
        let cancelled = false;

        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
            .then((r) => r.json())
            .then((d) => {
                if (cancelled) return;
                if (d?.newsletter_popup_enabled === "true") {
                    setCfg(d);
                    timer = setTimeout(() => {
                        if (localStorage.getItem(STORAGE_KEY)) return;
                        setOpen(true);
                    }, 6000);
                }
            })
            .catch(() => {});

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, []);

    const close = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: new Date().toISOString() }));
        setOpen(false);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("sending");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL_API}/newsletter/subscribe`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, source: "popup" }),
                }
            );
            if (!res.ok) throw new Error();
            setStatus("success");
            setEmail("");
            setTimeout(close, 1800);
        } catch {
            setStatus("error");
        }
    };

    if (!open || !cfg) return null;

    return (
        <div className={styles.overlay} onClick={close}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={close} aria-label="Close">
                    <X size={18} />
                </button>

                <div className={styles.iconWrap}>
                    <Mail size={28} />
                </div>

                <h3 className={styles.heading}>{cfg.newsletter_popup_heading || "Stay in the loop"}</h3>
                <p className={styles.subtext}>{cfg.newsletter_popup_subtext}</p>

                <form onSubmit={submit} className={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={status === "sending"}
                    />
                    <button type="submit" disabled={status === "sending"}>
                        {status === "sending" ? "..." : "Subscribe"}
                    </button>
                </form>

                {status === "success" && <p className={styles.success}>Thanks for subscribing!</p>}
                {status === "error" && <p className={styles.error}>Something went wrong. Please try again.</p>}
            </div>
        </div>
    );
};

export default NewsletterPopup;
