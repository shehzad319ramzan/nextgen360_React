import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import styles from "./BlogList.module.scss";
import PageSEO from "@/components/common/PageSEO/PageSEO";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const readTime = (content) => Math.max(1, Math.ceil((content?.length || 0) / 1500));

const getCoverUrl = (img) => {
  if (!img) return null;
  return img.startsWith("http") ? img : `${import.meta.env.VITE_BACKEND_URL}${img}`;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/blogs`)
      .then((r) => r.json())
      .then((data) => setBlogs(Array.isArray(data) ? data.filter((b) => b.status === "published") : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  const featured = !search && filtered.length > 0 ? filtered[0] : null;
  const rest = !search ? filtered.slice(1) : filtered;

  return (
    <>
      <PageSEO page="blog" fallback={{ path: "/blog" }} />

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.span className={styles.heroTag} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            Insights & Updates
          </motion.span>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Our Blog
          </motion.h1>
          <motion.p className={styles.heroSub} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Latest articles, case studies, and insights from the TSP team
            to help you stay ahead in technology.
          </motion.p>

          {/* Search */}
          <motion.div className={styles.searchWrapper} variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <section className={styles.contentSection}>

        {/* Loading */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading articles...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className={styles.emptyState}>
            <BookOpen size={36} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>
              {search ? "No Results Found" : "No Articles Yet"}
            </h3>
            <p className={styles.emptyText}>
              {search
                ? "Try a different search term or browse all articles."
                : "We're working on new content. Check back soon!"}
            </p>
          </div>
        )}

        {/* Featured Post */}
        {!loading && featured && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <Link to={`/blog/${featured.slug}`} className={styles.featuredCard}>
              {featured.cover_image && (
                <div className={styles.featuredImage}>
                  <img
                    src={getCoverUrl(featured.cover_image)}
                    alt={featured.title}
                  />
                </div>
              )}
              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>Featured</span>
                <div className={styles.cardMeta}>
                  <span><Calendar size={12} /> {formatDate(featured.created_at)}</span>
                  <span><Clock size={12} /> {readTime(featured.content)} min read</span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                {featured.excerpt && (
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                )}
                <span className={styles.readMore}>
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        {!loading && rest.length > 0 && (
          <>
            {featured && (
              <div className={styles.gridHeader}>
                <h2 className={styles.gridTitle}>All Articles</h2>
                <span className={styles.gridCount}>{rest.length} article{rest.length > 1 ? "s" : ""}</span>
              </div>
            )}
            <div className={styles.blogGrid}>
              {rest.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  custom={i % 6}
                >
                  <Link to={`/blog/${blog.slug}`} className={styles.blogCard}>
                    {blog.cover_image && (
                      <div className={styles.cardImage}>
                        <img
                          src={getCoverUrl(blog.cover_image)}
                          alt={blog.title}
                        />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span><Calendar size={11} /> {formatDate(blog.created_at)}</span>
                        <span><Clock size={11} /> {readTime(blog.content)} min read</span>
                      </div>
                      <h3 className={styles.cardTitle}>{blog.title}</h3>
                      {blog.excerpt && (
                        <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                      )}
                      <span className={styles.readMore}>
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default BlogList;
