import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Mail } from "lucide-react";
import styles from "./PrivacyPolicy.module.scss";

const PrivacyPolicy = () => {
    const [site, setSite] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
            .then((r) => r.json())
            .then((d) => setSite(d || {}))
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    const company = "NextGen360";
    const title = site.privacy_policy_title || "Privacy Policy";
    const updated = site.privacy_policy_updated || "April 2026";
    const content = site.privacy_policy_content || "";
    const email = site.site_email || "admin@tech-solutionspro.com";
    const phone = site.site_phone || "";
    const address = site.site_address || "";

    return (
        <div className={styles.page}>
            <Helmet>
                <title>{title} | {company}</title>
                <meta
                    name="description"
                    content={`Learn how ${company} collects, uses and protects your personal information.`}
                />
            </Helmet>

            {/* Hero */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.badge}>
                        <ShieldCheck size={16} />
                        <span>Your privacy matters</span>
                    </div>
                    <h1>{title}</h1>
                    <p>
                        How {company} collects, uses and protects the information you share with us.
                    </p>
                    <p className={styles.updated}>Last updated: {updated}</p>
                </div>
                <div className={styles.heroGlow} aria-hidden="true" />
            </header>

            <div className={styles.layout}>
                <article className={styles.content}>
                    {loaded && content ? (
                        <div
                            className={styles.richText}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : loaded ? (
                        <p className={styles.empty}>
                            Privacy policy content has not been added yet.
                        </p>
                    ) : null}

                    <section className={styles.contactBox}>
                        <div className={styles.sectionHead}>
                            <Mail size={20} />
                            <h2>Contact Us</h2>
                        </div>
                        <p>
                            If you have any questions about this Privacy Policy or how we handle your
                            data, please get in touch:
                        </p>
                        <ul className={styles.contactList}>
                            <li><strong>{company}</strong></li>
                            {address && <li>{address}</li>}
                            <li>
                                Email: <a href={`mailto:${email}`}>{email}</a>
                            </li>
                            {phone && (
                                <li>
                                    Phone: <a href={`tel:${phone}`}>{phone}</a>
                                </li>
                            )}
                        </ul>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
