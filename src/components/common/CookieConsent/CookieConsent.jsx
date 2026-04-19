import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieConsent.module.scss";

const STORAGE_KEY = "tsp_cookie_consent";

const CookieConsent = () => {
    const [cfg, setCfg] = useState(null);
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [prefs, setPrefs] = useState({ necessary: true, analytics: true, marketing: true });

    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY)) return;
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
            .then((r) => r.json())
            .then((d) => {
                if (d?.cookie_consent_enabled === "true") {
                    setCfg(d);
                    setVisible(true);
                }
            })
            .catch(() => {});
    }, []);

    const persist = (decision) => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ decision, prefs, at: new Date().toISOString() })
        );
        setVisible(false);
    };

    if (!visible || !cfg) return null;

    return (
        <div className={styles.wrapper} role="dialog" aria-live="polite">
            <div className={styles.banner}>
                <div className={styles.content}>
                    <h3 className={styles.title}>{cfg.cookie_banner_title || "We value your privacy"}</h3>
                    <p className={styles.message}>{cfg.cookie_banner_message}</p>

                    {showDetails && (
                        <div className={styles.details}>
                            <p className={styles.description}>{cfg.cookie_banner_description}</p>

                            <div className={styles.categories}>
                                <label className={`${styles.cat} ${styles.disabled}`}>
                                    <input type="checkbox" checked readOnly />
                                    <span>{cfg.cookie_necessary_label || "Strictly Necessary"}</span>
                                </label>
                                <label className={styles.cat}>
                                    <input
                                        type="checkbox"
                                        checked={prefs.analytics}
                                        onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                                    />
                                    <span>{cfg.cookie_analytics_label || "Analytics & Performance"}</span>
                                </label>
                                <label className={styles.cat}>
                                    <input
                                        type="checkbox"
                                        checked={prefs.marketing}
                                        onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                                    />
                                    <span>{cfg.cookie_marketing_label || "Marketing & Advertising"}</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {cfg.cookie_policy_url && (
                        <Link to={cfg.cookie_policy_url} className={styles.policyLink}>
                            View privacy policy
                        </Link>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.btnGhost}
                        onClick={() => setShowDetails((v) => !v)}
                    >
                        {showDetails ? "Hide" : "Customise"}
                    </button>
                    <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => persist("declined")}
                    >
                        {cfg.cookie_decline_text || "Reject All"}
                    </button>
                    <button
                        type="button"
                        className={styles.btnPrimary}
                        onClick={() => {
                            setPrefs({ necessary: true, analytics: true, marketing: true });
                            persist("accepted");
                        }}
                    >
                        {cfg.cookie_accept_text || "Accept All"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
