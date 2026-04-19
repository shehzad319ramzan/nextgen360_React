import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, Briefcase, MapPin, Clock, Upload, ArrowRight } from "lucide-react";
import styles from "./Apply.module.scss";
import { htmlProps } from "@/utils/html";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Apply = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", cover_letter: "" });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (!jobId) { setLoading(false); return; }
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/jobs/${jobId}`)
      .then((r) => r.json())
      .then((data) => { setJob(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [jobId]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.cover_letter.trim()) errs.cover_letter = "Please write a brief cover letter";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("job_id", jobId || "");
      formData.append("job_title", job?.title || "General Application");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("experience", form.experience);
      formData.append("cover_letter", form.cover_letter);
      if (resume) formData.append("resume", resume);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/job-applications`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <>
      {/* ─── Hero Banner ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link to="/careers" className={styles.backLink}>
            <ArrowLeft size={14} /> Back to Careers
          </Link>
          {job ? (
            <>
              <motion.div className={styles.jobTypeBadge} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                {job.type}
              </motion.div>
              <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                {job.title}
              </motion.h1>
              <motion.div className={styles.heroMeta} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <span className={styles.metaItem}><MapPin size={14} /> {job.location}</span>
                <span className={styles.metaItem}><Clock size={14} /> {job.type}</span>
                <span className={styles.metaItem}><Briefcase size={14} /> Apply Below</span>
              </motion.div>
            </>
          ) : (
            <>
              <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                General Application
              </motion.h1>
              <motion.p className={styles.heroSub} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                Submit your details and we'll reach out when a matching role opens.
              </motion.p>
            </>
          )}
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className={styles.contentSection}>
        <div className={styles.contentWrapper}>

          {/* Left — Job Details */}
          {job && (
            <motion.div
              className={styles.detailsPanel}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              {job.description && (
                <div className={styles.detailBlock}>
                  <h3 className={styles.detailTitle}>About the Role</h3>
                  <div className={styles.detailText} {...htmlProps(job.description)} />
                </div>
              )}
              {job.requirements && (
                <div className={styles.detailBlock}>
                  <h3 className={styles.detailTitle}>Requirements</h3>
                  <div className={styles.detailText} {...htmlProps(job.requirements)} />
                </div>
              )}
            </motion.div>
          )}

          {/* Right — Form */}
          <motion.div
            className={styles.formPanel}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  className={styles.thankYou}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 size={56} className={styles.thankYouIcon} />
                  </motion.div>
                  <h3 className={styles.thankYouTitle}>Application Submitted!</h3>
                  <p className={styles.thankYouText}>
                    Thank you for applying{job ? ` for ${job.title}` : ""}. Our team will review
                    your application and get back to you soon.
                  </p>
                  <Link to="/careers" className={styles.thankYouBtn}>
                    View More Positions <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2 className={styles.formTitle}>Apply for this Position</h2>
                  <p className={styles.formSub}>Fields marked with * are required</p>

                  {/* Name + Email */}
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="John Doe"
                        className={styles.input}
                      />
                      {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="john@example.com"
                        className={styles.input}
                      />
                      {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone + Experience */}
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Phone Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="01157950428"
                        className={styles.input}
                      />
                      {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Years of Experience</label>
                      <select
                        value={form.experience}
                        onChange={(e) => updateField("experience", e.target.value)}
                        className={styles.input}
                      >
                        <option value="">Select</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-8">5-8 years</option>
                        <option value="8+">8+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Resume */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Resume / CV (PDF, DOC — max 5MB)</label>
                    <div className={styles.uploadArea}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0] || null)}
                        className={styles.uploadInput}
                      />
                      <div className={styles.uploadContent}>
                        <Upload size={18} className={styles.uploadIcon} />
                        <span className={styles.uploadText}>
                          {resume ? resume.name : "Click to upload your resume"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Cover Letter *</label>
                    <textarea
                      value={form.cover_letter}
                      onChange={(e) => updateField("cover_letter", e.target.value)}
                        placeholder="Tell us why you're a great fit for this role, your key skills, and what excites you about NextGen360..."
                      rows={5}
                      className={styles.textarea}
                    />
                    {errors.cover_letter && <p className={styles.errorText}>{errors.cover_letter}</p>}
                  </div>

                  {errors.submit && (
                    <p className={styles.submitError}>{errors.submit}</p>
                  )}

                  <button type="submit" disabled={submitting} className={styles.submitBtn}>
                    {submitting ? (
                      <span className={styles.spinnerSmall} />
                    ) : (
                      <>
                        Submit Application
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Apply;
