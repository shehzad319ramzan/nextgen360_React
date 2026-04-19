import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import {
    companyLinks,
    footerContactBox,
    industries,
    servicesLinks,
} from "../../data/footerData";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import GoogleRating from "../HomeComponents/Testimonials/GoogleRating/GoogleRating";

const Footer = () => {
    const navigate = useNavigate();
    const [googleRating, setGoogleRating] = useState(null);
    const [email, setEmail] = useState("");
    const [newsletterStatus, setNewsletterStatus] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
            .then((r) => r.json())
            .then((d) => setLogoUrl(d?.logo_light || ""))
            .catch(() => {});
    }, []); // "", "sending", "success", "error"

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setNewsletterStatus("sending");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "footer" }),
            });
            if (!res.ok) throw new Error();
            setNewsletterStatus("success");
            setEmail("");
            setTimeout(() => setNewsletterStatus(""), 4000);
        } catch {
            setNewsletterStatus("error");
            setTimeout(() => setNewsletterStatus(""), 4000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleServiceNav = (url) => {
        navigate(url);
    };

    useEffect(() => {
        if (!window.google) return;
        const service = new window.google.maps.places.PlacesService(
            document.createElement("div")
        );
        service.getDetails(
            {
                placeId: import.meta.env.VITE_GOOGLE_PLACE_ID,
                fields: ["name", "rating", "reviews"],
            },
            (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setGoogleRating(place.rating || null);
                }
            }
        );
    }, []);

    return (
        <footer className={styles.footer}>
            <span className={styles.topLine} />
            <div className={styles.footerContainer}>
                <div className={styles.particles} aria-hidden="true">
                    <span /><span /><span /><span /><span /><span /><span />
                </div>
                <div className={styles.scrollBtnContainer}>
                    <button onClick={scrollToTop} className={styles.scrollTopBtn}>
                        <IoIosArrowDropupCircle size={45} />
                    </button>
                </div>

                <div className="flex flex-col xl:flex-row justify-between gap-x-20 gap-y-10 mb-10">
                    {/* Contact Information */}
                    <div className={cn(styles.contactBox, "w-full xl:w-1/4")}>
                        <div className={styles.contactItem}>
                            <div className={styles.iconCircle}>
                                <FiPhoneCall size={20} />
                            </div>
                            <div className={styles.contactText}>
                                <p>Call Us</p>
                                <a href={`tel:${footerContactBox.contactNumber}`} className={styles.contactLink}>
                                    {footerContactBox.contactNumber}
                                </a>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.iconCircle}>
                                <Mail size={20} />
                            </div>
                            <div className={styles.contactText}>
                                <p>Email Us</p>
                                <a href={`mailto:${footerContactBox.email}`} className={styles.contactLink}>
                                    {footerContactBox.email}
                                </a>
                            </div>
                        </div>

                        <div className={styles.googleRating}>
                            <GoogleRating footer={true} rating={googleRating} />
                        </div>

                        <div className={styles.socialsBox}>
                            <p className={styles.socialText}>Our Socials</p>
                            <div className={styles.socialIcons}>
                                {footerContactBox.socialLinks?.map((link, index) => {
                                    const IconComponent = link.Icon;
                                    return (
                                        <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                            <IconComponent size={24} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="w-full xl:w-3/4 flex flex-col md:flex-row justify-between gap-5 md:gap-8 px-8 md:py-6">
                        {/* Services */}
                        <div className={styles.linkSection}>
                            <h3 className={styles.sectionTitle}>{servicesLinks.title}</h3>
                            <ul className={styles.linkList}>
                                {servicesLinks.links.map((link, index) => (
                                    <li key={index}>
                                        <button className={styles.serviceLink} onClick={() => handleServiceNav(link.url)}>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Industry */}
                        <div className={styles.linkSection}>
                            <h3 className={styles.sectionTitle}>{industries.title}</h3>
                            <ul className={styles.linkList}>
                                {industries.links.map((link, index) => (
                                    <li key={index}>
                                        <span className={styles.industryNames}>{link.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company — using React Router Links */}
                        <div className={styles.linkSection}>
                            <h3 className={styles.sectionTitle}>{companyLinks.title}</h3>
                            <ul className={styles.linkList}>
                                {companyLinks.links.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.url} className={styles.serviceLink}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter — now functional */}
                <div className={styles.newsletterContainer}>
                    <h3 className={styles.newsletterTitle}>Newsletter Sign Up</h3>
                    <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email here..."
                            className={styles.newsletterInput}
                            required
                            disabled={newsletterStatus === "sending"}
                        />
                        <div className="flex justify-center items-center">
                            <Button type="submit" variant="primary" disabled={newsletterStatus === "sending"}>
                                {newsletterStatus === "sending" ? "..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                    {newsletterStatus === "success" && (
                        <p className="text-green-300 text-xs mt-2 text-center">Subscribed successfully!</p>
                    )}
                    {newsletterStatus === "error" && (
                        <p className="text-red-300 text-xs mt-2 text-center">Already subscribed or an error occurred.</p>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.logo}>
                        <Link to="/">
                            {logoUrl && <img src={logoUrl} alt="Tech Solutions Pro" />}
                        </Link>
                    </div>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Tech Solutions Pro &bull; All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
