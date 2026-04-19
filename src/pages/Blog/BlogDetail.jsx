import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Check, BookOpen } from "lucide-react";
import BlogSEO from "./BlogSEO";
import styles from "./BlogDetail.module.scss";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const readTime = (content) => Math.max(1, Math.ceil((content?.length || 0) / 1500));

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/blogs/${slug}`)
      .then((r) => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then((data) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <BookOpen size={40} className={styles.notFoundIcon} />
        <h2 className={styles.notFoundTitle}>Article Not Found</h2>
        <p className={styles.notFoundText}>
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className={styles.notFoundBtn}>
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  const coverUrl = blog.cover_image
    ? blog.cover_image.startsWith("http") ? blog.cover_image : `${import.meta.env.VITE_BACKEND_URL}${blog.cover_image}`
    : null;

  return (
    <>
      <BlogSEO blog={blog} slug={slug} />

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <Link to="/blog" className={styles.backLink}>
              <ArrowLeft size={14} /> All Articles
            </Link>
          </motion.div>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {blog.title}
          </motion.h1>
          <motion.div className={styles.heroMeta} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <span className={styles.metaItem}><Calendar size={13} /> {formatDate(blog.created_at)}</span>
            <span className={styles.metaItem}><Clock size={13} /> {readTime(blog.content)} min read</span>
            <button onClick={handleShare} className={styles.shareBtn}>
              {copied ? <><Check size={13} /> Copied!</> : <><Share2 size={13} /> Share</>}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Article ─── */}
      <article className={styles.articleSection}>
        <div className={styles.articleWrapper}>

          {/* Cover Image */}
          {coverUrl && (
            <motion.div
              className={styles.coverImage}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <img src={coverUrl} alt={blog.title} />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            className={styles.prose}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Bottom nav */}
          <div className={styles.bottomNav}>
            <Link to="/blog" className={styles.bottomBackLink}>
              <ArrowLeft size={14} /> Back to All Articles
            </Link>
            <button onClick={handleShare} className={styles.bottomShareBtn}>
              {copied ? <><Check size={14} /> Link Copied</> : <><Share2 size={14} /> Share Article</>}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
