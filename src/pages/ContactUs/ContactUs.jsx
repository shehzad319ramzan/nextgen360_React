import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, ArrowRight } from "lucide-react";
import styles from "./ContactUs.module.scss";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "https://nextgen360.info",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "01157950428",
    sub: "Mon – Fri, 9AM – 6PM EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "507 Alfreton Road, Nottingham, England NG7 5NH",
    sub: "United States",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon – Fri: 9AM – 6PM",
    sub: "Weekend support available",
  },
];

const SUB_CATEGORIES = {
  "Web Development": ["Frontend Development", "Backend Development", "Full Stack Development", "E-commerce Solutions"],
  "Mobile Development": ["iOS Development", "Android Development", "Cross Platform", "Hybrid Apps"],
  "Digital Marketing": [
    "Search Engine Optimization (SEO)", "Pay-Per-Click (PPC) Advertising",
    "Social Media Marketing", "Social Media Management",
    "Content Marketing", "Email Marketing", "Video Marketing", "Graphic Design & Branding",
  ],
  Consulting: ["Technical Consulting", "Business Strategy", "Digital Transformation", "Process Optimization"],
  Support: ["Technical Support", "Maintenance", "Bug Fixes", "Feature Requests"],
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    Category: "",
    SubCategory: "",
    Name: "",
    Email: "",
    PhoneNo: "",
    Description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.Category) newErrors.Category = "Please select a category.";
    if (!formData.SubCategory && formData.Category !== "General Inquiry")
      newErrors.SubCategory = "Please select a sub-category.";
    if (!formData.Name) newErrors.Name = "Name is required.";
    if (!formData.Email) newErrors.Email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.Email))
      newErrors.Email = "Email is invalid.";
    if (!formData.PhoneNo) newErrors.PhoneNo = "Phone number is required.";
    if (!formData.Description)
      newErrors.Description = "Description is required.";
    return newErrors;
  };

  const handleChange = (field, value) => {
    if (field === "Category") {
      const subCategoryValue = value === "General Inquiry" ? "none" : "";
      setFormData({ ...formData, [field]: value, SubCategory: subCategoryValue });
      setErrors({ ...errors, [field]: "", SubCategory: "" });
    } else {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL_API}/contact-us`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData }),
        }
      );
      if (!response.ok) throw new Error("Failed to send message.");
      setShowThankYou(true);
      setFormData({ Category: "", SubCategory: "", Name: "", Email: "", PhoneNo: "", Description: "" });
    } catch {
      setShowThankYou(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageSEO page="contact" fallback={{ path: "/contact" }} />

      {/* ─── Hero Banner ─── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroTag}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Let's Build Something{" "}
            <span className={styles.heroHighlight}>Amazing</span> Together
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Have a project in mind? We'd love to hear about it. Drop us a message
            and our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ─── Contact Info Cards ─── */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.infoCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
            >
              <div className={styles.infoIcon}>
                <item.icon size={22} />
              </div>
              <h3 className={styles.infoTitle}>{item.title}</h3>
              <p className={styles.infoDetail}>{item.detail}</p>
              <p className={styles.infoSub}>{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          {/* Left side */}
          <motion.div
            className={styles.formLeft}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className={styles.formLeftTitle}>
              Ready to Start Your Project?
            </h2>
            <p className={styles.formLeftDesc}>
              Fill out the form and our experts will reach out to discuss your
              requirements, timeline, and budget. No obligation — just a
              friendly conversation about your goals.
            </p>
            <div className={styles.formLeftFeatures}>
              {[
                "Free initial consultation",
                "Custom solution tailored to your needs",
                "Transparent pricing — no hidden costs",
                "Dedicated project manager assigned",
              ].map((text) => (
                <div key={text} className={styles.featureItem}>
                  <div className={styles.featureCheck}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side — Form */}
          <motion.div
            className={styles.formRight}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            {showThankYou ? (
              <div className={styles.thankYouContainer}>
                <div className={styles.successIcon}>
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <circle cx="36" cy="36" r="36" fill="#10B981" />
                    <path d="M22 36L32 46L50 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className={styles.thankYouTitle}>Thank You!</h3>
                <p className={styles.thankYouMessage}>
                  Your message has been sent successfully. Our team will review
                  your inquiry and get back to you shortly.
                </p>
                <Button className={styles.newInquiryButton} onClick={() => setShowThankYou(false)}>
                  Send Another Inquiry
                  <ArrowRight size={16} />
                </Button>
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Send Us a Message</h3>
                <p className={styles.formSubtitle}>
                  Tell us about your project and we'll get back to you promptly.
                </p>

                {/* Category */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Category</label>
                  <Select onValueChange={(v) => handleChange("Category", v)} value={formData.Category}>
                    <SelectTrigger className={styles.customSelectTrigger}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["General Inquiry", "Web Development", "Mobile Development",  "Consulting", "Support"].map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.Category && <p className={styles.errorText}>{errors.Category}</p>}
                </div>

                {/* Sub-Category */}
                {formData.Category && formData.Category !== "General Inquiry" && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Sub-Category</label>
                    <Select onValueChange={(v) => handleChange("SubCategory", v)} value={formData.SubCategory}>
                      <SelectTrigger className={styles.customSelectTrigger}>
                        <SelectValue placeholder="Select a sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                        {(SUB_CATEGORIES[formData.Category] || []).map((sub) => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.SubCategory && <p className={styles.errorText}>{errors.SubCategory}</p>}
                  </div>
                )}

                {/* Name & Email row */}
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Full Name</label>
                    <Input
                      className={styles.inputField}
                      placeholder="John Doe"
                      value={formData.Name}
                      onChange={(e) => handleChange("Name", e.target.value)}
                    />
                    {errors.Name && <p className={styles.errorText}>{errors.Name}</p>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Email Address</label>
                    <Input
                      className={styles.inputField}
                      placeholder="john@example.com"
                      value={formData.Email}
                      onChange={(e) => handleChange("Email", e.target.value)}
                    />
                    {errors.Email && <p className={styles.errorText}>{errors.Email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Phone Number</label>
                  <Input
                    className={styles.inputField}
                    placeholder="01157950428"
                    value={formData.PhoneNo}
                    onChange={(e) => handleChange("PhoneNo", e.target.value)}
                  />
                  {errors.PhoneNo && <p className={styles.errorText}>{errors.PhoneNo}</p>}
                </div>

                {/* Description */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Project Description</label>
                  <Textarea
                    className={styles.inputTextarea}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    value={formData.Description}
                    onChange={(e) => handleChange("Description", e.target.value)}
                  />
                  {errors.Description && <p className={styles.errorText}>{errors.Description}</p>}
                </div>

                {/* Submit */}
                <Button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <span className={styles.loadingSpinner} />
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
