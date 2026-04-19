import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.scss";
import { servicesData } from "@/data/footerData";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
    const [hoveredSolutionId, setHoveredSolutionId] = useState(null);
    const [logos, setLogos] = useState({ light: "", dark: "" });
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
            .then((r) => r.json())
            .then((d) => setLogos({ light: d?.logo_light || "", dark: d?.logo_dark || "" }))
            .catch(() => {});

        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/solutions`)
            .then((r) => r.json())
            .then((d) => setSolutions(Array.isArray(d) ? d : []))
            .catch(() => {});
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);

    // Scroll detection
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setMobileSubmenuOpen(null);
    }, [location.pathname]);

    // Resize handler
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 991) { setMobileMenuOpen(false); setMobileSubmenuOpen(null); }
            else { setActiveDropdown(null); }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Click outside to close
    useEffect(() => {
        const onClick = (e) => {
            if (activeDropdown && !e.target.closest(`.${styles.dropdownContainer}`) && !e.target.closest(`.${styles.megaMenu}`)) {
                setActiveDropdown(null);
            }
            if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest(`.${styles.mobileMenuToggle}`)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [activeDropdown, mobileMenuOpen]);

    const toggleDropdown = (d) => setActiveDropdown(activeDropdown === d ? null : d);
    const toggleMobileSubmenu = (m) => setMobileSubmenuOpen(mobileSubmenuOpen === m ? null : m);

    const handleSolutionNav = (solution) => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(null);
        navigate(`/solutions/${solution.slug || solution.name}`);
    };

    const closeAll = () => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(null);
    };

    const isActive = (path) => location.pathname === path;
    const isDark = isScrolled || activeDropdown;

    const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : styles.atTop} ${activeDropdown ? styles.dropdownActive : ""} ${mobileMenuOpen ? styles.mobileMenuActive : ""}`;

    const navLinkStyle = (path) => ({
        opacity: isActive(path) ? 1 : 0.85,
        position: "relative",
    });

    return (
        <>
            <header className={headerClass}>
                {/* Logo */}
                <div className={styles.logo}>
                    <Link to="/">
                        {(isDark ? logos.dark : logos.light) && (
                            <img src={isDark ? logos.dark : logos.light} alt="Tech Solutions Pro" />
                        )}
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <Link to="/" style={navLinkStyle("/")}>Home</Link>

                    <div className={styles.dropdownContainer}>
                        <button className={styles.dropdownButton} onClick={() => toggleDropdown("services")}>
                            Services
                            <FaChevronDown className={`${styles.dropdownIcon} ${activeDropdown === "services" ? styles.rotate : ""}`} />
                        </button>
                    </div>

                    <div className={styles.dropdownContainer}>
                        <button className={styles.dropdownButton} onClick={() => toggleDropdown("solutions")}>
                            Solutions
                            <FaChevronDown className={`${styles.dropdownIcon} ${activeDropdown === "solutions" ? styles.rotate : ""}`} />
                        </button>
                    </div>

                    <Link to="/portfolio" style={navLinkStyle("/portfolio")}>Portfolio</Link>
                    <Link to="/blog" style={navLinkStyle("/blog")}>Blog</Link>
                    <Link to="/careers" style={navLinkStyle("/careers")}>Join TSP</Link>
                    <Link to="/aboutus" style={navLinkStyle("/aboutus")}>About</Link>

                    <button className={styles.contactButton} onClick={() => { closeAll(); navigate("/contact"); }}>
                        <div className={styles.contactButtonWrapper}>
                            Contact Us <FaArrowRight size={30} className={styles.arrowIcon} />
                        </div>
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.mobileIconOpen : ""}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </header>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`} ref={menuRef}>
                <button
                    type="button"
                    onClick={closeAll}
                    aria-label="Close menu"
                    className={styles.mobileCloseBtn}
                >
                    <FaTimes />
                </button>
                <nav className={styles.mobileNav}>
                    <Link to="/" className={styles.mobileNavLink} onClick={closeAll}>Home</Link>

                    {/* Mobile Services */}
                    <div className={styles.mobileDropdown}>
                        <button className={styles.mobileDropdownToggle} onClick={() => toggleMobileSubmenu("services")}>
                            Services
                            <FaChevronDown className={`${styles.mobileDropdownIcon} ${mobileSubmenuOpen === "services" ? styles.rotate : ""}`} />
                        </button>
                        {mobileSubmenuOpen === "services" && (
                            <div className={styles.mobileSubmenu}>
                                {servicesData.map((category, index) => (
                                    <div key={index} className={styles.mobileCategory}>
                                        <div className={styles.mobileCategoryHeader}>
                                            <img src={category.icon} alt={category.title} className={styles.mobileCategoryIcon} />
                                            <h3 className={styles.mobileCategoryTitle}>{category.title}</h3>
                                            <ul className={styles.mobileServicesList}>
                                                {category.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Link to={item.url} className={styles.mobileServiceLink} onClick={closeAll}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Solutions */}
                    <div className={styles.mobileDropdown}>
                        <button className={styles.mobileDropdownToggle} onClick={() => toggleMobileSubmenu("solutions")}>
                            Solutions
                            <FaChevronDown className={`${styles.mobileDropdownIcon} ${mobileSubmenuOpen === "solutions" ? styles.rotate : ""}`} />
                        </button>
                        {mobileSubmenuOpen === "solutions" && (
                            <div className={styles.mobileSubmenu}>
                                <div className={styles.mobileServicesGrid}>
                                    {solutions.map((solution) => {
                                        const showActive = hoveredSolutionId === solution.id;
                                        const logoSrc = (showActive ? solution.active_logo : solution.logo) || solution.logo || solution.active_logo;
                                        return (
                                            <button key={solution.id} className={styles.mobileServiceCard}
                                                onClick={() => handleSolutionNav(solution)}
                                                onTouchStart={() => setHoveredSolutionId(solution.id)}
                                                onTouchEnd={() => setHoveredSolutionId(null)}
                                                onMouseEnter={() => setHoveredSolutionId(solution.id)}
                                                onMouseLeave={() => setHoveredSolutionId(null)}>
                                                <div className={styles.mobileServiceLogo}>
                                                    {logoSrc ? (
                                                        <img src={logoSrc} alt={solution.title} className={styles.mobileLogoImage} />
                                                    ) : (
                                                        <span className={styles.mobileLogoImage} style={{ fontWeight: 700 }}>{solution.title}</span>
                                                    )}
                                                </div>
                                                <p className={styles.mobileServiceTagline}>{solution.tagline}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/portfolio" className={styles.mobileNavLink} onClick={closeAll}>Portfolio</Link>
                    <Link to="/blog" className={styles.mobileNavLink} onClick={closeAll}>Blog</Link>
                    <Link to="/careers" className={styles.mobileNavLink} onClick={closeAll}>Join TSP</Link>
                    <Link to="/aboutus" className={styles.mobileNavLink} onClick={closeAll}>About</Link>

                    <button className={styles.mobileContactButton} onClick={() => { closeAll(); navigate("/contact"); }}>
                        Contact Us <FaArrowRight className={styles.mobileArrowIcon} />
                    </button>
                </nav>
            </div>

            {/* Desktop Megamenu — Services */}
            {!mobileMenuOpen && activeDropdown === "services" && (
                <div className={styles.megaMenu}>
                    <div className={styles.megaMenuContainer}>
                        {servicesData.map((category, index) => (
                            <div key={index} className={styles.megaMenuCategory}>
                                <div className={styles.categoryHeader}>
                                    <div className={styles.iconContainer}>
                                        <img src={category.icon} alt={category.title} />
                                    </div>
                                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                                    <ul>
                                        {category.items.map((item, idx) => (
                                            <li key={idx}>
                                                <Link to={item.url} className={styles.serviceLink} onClick={closeAll}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Desktop Megamenu — Solutions */}
            {!mobileMenuOpen && activeDropdown === "solutions" && (
                <div className={styles.megaMenu}>
                    <div className={styles.solutionsContainer}>
                        {solutions.map((solution) => {
                            const showActive = hoveredSolutionId === solution.id;
                            const logoSrc = (showActive ? solution.active_logo : solution.logo) || solution.logo || solution.active_logo;
                            return (
                                <button key={solution.id} className={styles.solutionCard}
                                    onClick={() => handleSolutionNav(solution)}
                                    onMouseEnter={() => setHoveredSolutionId(solution.id)}
                                    onMouseLeave={() => setHoveredSolutionId(null)}>
                                    <div className={styles.solutionCardContent}>
                                        <div className={styles.solutionLogo}>
                                            {logoSrc ? (
                                                <img src={logoSrc} alt={solution.title} />
                                            ) : (
                                                <span style={{ fontWeight: 700, fontSize: 16 }}>{solution.title}</span>
                                            )}
                                        </div>
                                        <p className={styles.solutionTagline}>{solution.tagline}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
