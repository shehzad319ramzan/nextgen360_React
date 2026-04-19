import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Shield, MessageCircle, Users, Quote } from "lucide-react";
import styles from "./About.module.scss";
import { aboutContent } from "@/data/aboutData";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import { htmlProps } from "@/utils/html";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const valueIcons = [Lightbulb, Shield, MessageCircle, Users];

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/team`)
      .then((r) => r.json())
      .then((data) => setTeamMembers(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <>
      <PageSEO page="about" fallback={{ path: "/aboutus" }} />
      <div className={styles.aboutPage}>

        {/* ─── Hero ─── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <motion.span className={styles.heroTag} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              About Us
            </motion.span>
            <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              {aboutContent.heroTitle}
            </motion.h1>
            <motion.p className={styles.heroSub} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              {aboutContent.heroDescription}
            </motion.p>
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section className={styles.statsBar}>
          <div className={styles.statsGrid}>
            {aboutContent.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Mission & Vision ─── */}
        <section className={styles.missionSection}>
          <div className={styles.missionWrapper}>
            <motion.div
              className={styles.missionImage}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <img src={aboutContent.mission.img} alt="Our Mission" />
            </motion.div>
            <div className={styles.missionContent}>
              <motion.div
                className={styles.missionBlock}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <div className={styles.sectionIcon}>
                  <Target size={22} />
                </div>
                <h2 className={styles.sectionTitle}>{aboutContent.mission.title}</h2>
                <p className={styles.sectionDesc}>{aboutContent.mission.description}</p>
              </motion.div>
              <motion.div
                className={styles.visionBlock}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                <div className={styles.sectionIcon}>
                  <Eye size={22} />
                </div>
                <h2 className={styles.sectionTitle}>{aboutContent.vision.title}</h2>
                <p className={styles.sectionDesc}>{aboutContent.vision.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className={styles.valuesSection}>
          <motion.div
            className={styles.valuesHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className={styles.valuesSectionTitle}>Our Core Values</h2>
            <p className={styles.valuesSectionSub}>The principles that guide everything we do</p>
          </motion.div>
          <div className={styles.valuesGrid}>
            {aboutContent.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={val.title}
                  className={styles.valueCard}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                >
                  <div className={styles.valueIcon}>
                    <Icon size={22} />
                  </div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ─── Founder ─── */}
        <section className={styles.founderSection}>
          <div className={styles.founderWrapper}>
            <motion.div
              className={styles.founderImage}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <img src={aboutContent.founder.img} alt={aboutContent.founder.title} />
            </motion.div>
            <motion.div
              className={styles.founderContent}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <Quote size={36} className={styles.quoteIcon} />
              <p className={styles.founderQuote}>{aboutContent.founder.description1}</p>
              <div className={styles.founderInfo}>
                <h3 className={styles.founderName}>{aboutContent.founder.title}</h3>
                <span className={styles.founderRole}>{aboutContent.founder.Subtitle}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Team ─── */}
        {teamMembers.length > 0 && (
          <section className={styles.teamSection}>
            <motion.div
              className={styles.teamHeader}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <h2 className={styles.teamSectionTitle}>Meet Our Team</h2>
              <p className={styles.teamSectionSub}>
                The talented people behind our success
              </p>
            </motion.div>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  className={styles.teamCard}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  custom={i % 6}
                >
                  <div className={styles.teamAvatar}>
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} />
                    ) : (
                      <div className={styles.teamAvatarPlaceholder}>
                        {member.name ? member.name.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </div>
                  <div className={styles.teamInfo}>
                    <h4 className={styles.teamName}>{member.name}</h4>
                    <span className={styles.teamRole}>{member.role}</span>
                    {member.bio && <div className={styles.teamBio} {...htmlProps(member.bio)} />}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default About;
