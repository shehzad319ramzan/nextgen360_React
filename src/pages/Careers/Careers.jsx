import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, Clock, Briefcase, ArrowRight, Users, Rocket, Heart,
  GraduationCap, Search, FileText, UserCheck, HandshakeIcon,
} from "lucide-react";
import styles from "./Careers.module.scss";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import { stripHtml } from "@/utils/html";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const PERKS = [
  { icon: Rocket, title: "Growth First", text: "Continuous learning, certifications, and career advancement opportunities to help you reach your full potential." },
  { icon: Users, title: "Collaborative Culture", text: "Work alongside talented engineers, designers, and innovators in an environment that values every voice." },
  { icon: Heart, title: "Work-Life Balance", text: "Flexible hours, remote options, and a healthy work environment so you can do your best work." },
  { icon: GraduationCap, title: "Mentorship", text: "Guidance from senior leads and industry experts to accelerate your skills and career growth." },
];

const PROCESS = [
  { icon: Search, title: "Apply Online", desc: "Browse our openings and submit your application with your resume and cover letter." },
  { icon: FileText, title: "Application Review", desc: "Our team carefully reviews every application and gets back to you within a few days." },
  { icon: UserCheck, title: "Interview", desc: "Meet the team through a friendly interview process focused on your skills and culture fit." },
  { icon: HandshakeIcon, title: "Welcome Aboard", desc: "Receive your offer and join the NextGen360 family with a smooth onboarding experience." },
];

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobsRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/jobs`)
      .then((r) => r.json())
      .then((data) => { setJobs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <PageSEO page="careers" fallback={{ path: "/careers" }} />

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.span className={styles.heroTag} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            We're Hiring
          </motion.span>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Build the Future With{" "}
            <span className={styles.heroHighlight}>NextGen360</span>
          </motion.h1>
          <motion.p className={styles.heroSub} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            We're looking for passionate people who want to build innovative software,
            push boundaries, and grow their careers alongside a world-class team.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <button
              onClick={() => jobsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className={styles.heroCta}
            >
              View Open Positions
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className={styles.statsStrip}>
        <div className={styles.statsGrid}>
          {[
            { value: "50+", label: "Team Members" },
            { value: "4.8/5", label: "Employee Rating" },
            { value: "92%", label: "Retention Rate" },
            { value: "15+", label: "Countries" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.statItem}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
            >
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      { }
      <section className={styles.perksSection}>
        <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <h2 className={styles.sectionTitle}>Why You'll Love Working Here</h2>
          <p className={styles.sectionSub}>We invest in our people because great products come from great teams</p>
        </motion.div>
        <div className={styles.perksGrid}>
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                className={styles.perkCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className={styles.perkIcon}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkText}>{perk.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Hiring Process ─── */}
      <section className={styles.processSection}>
        <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <h2 className={styles.sectionTitle}>Our Hiring Process</h2>
          <p className={styles.sectionSub}>Simple, transparent, and respectful of your time</p>
        </motion.div>
        <div className={styles.processGrid}>
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className={styles.processStep}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className={styles.processNumber}>{String(i + 1).padStart(2, "0")}</div>
                <div className={styles.processIcon}>
                  <Icon size={20} />
                </div>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Job Openings ─── */}
      <section ref={jobsRef} className={styles.jobsSection}>
        <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <p className={styles.sectionSub}>
            {jobs.length > 0
              ? `${jobs.length} position${jobs.length > 1 ? "s" : ""} available — find your perfect role`
              : "Check back soon for new opportunities"}
          </p>
        </motion.div>

        <div className={styles.jobsList}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
            </div>
          ) : jobs.length === 0 ? (
            <div className={styles.emptyState}>
              <Briefcase size={36} className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No Openings Right Now</h3>
              <p className={styles.emptyText}>We're always looking for talented people. Send us your resume and we'll reach out when a matching role opens.</p>
              <Link to="/contact" className={styles.emptyLink}>
                Get in Touch <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            jobs.map((job, i) => (
              <motion.div
                key={job.id}
                className={styles.jobCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i % 6}
              >
                <div className={styles.jobInfo}>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobType}>{job.type}</span>
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.jobDetails}>
                    <span className={styles.jobDetail}><MapPin size={13} /> {job.location}</span>
                    <span className={styles.jobDetail}><Clock size={13} /> {job.type}</span>
                  </div>
                  {job.description && (
                    <p className={styles.jobDesc}>{stripHtml(job.description)}</p>
                  )}
                </div>
                <Link to={`/careers/apply/${job.id}`} className={styles.applyBtn}>
                  Apply Now
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaBanner}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <h2 className={styles.ctaTitle}>Don't See a Role That Fits?</h2>
          <p className={styles.ctaText}>
            We're always interested in hearing from talented people. Send us your resume
            and we'll keep you in mind for future opportunities.
          </p>
          <Link to="/contact" className={styles.ctaBtn}>
            Send Your Resume <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Careers;
