import React from "react";
import styles from "./StatsSection.module.scss";

const StatsSection = ({ title, stats }) => {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statsContent}>
                <p className={styles.statsTitle}>{title}</p>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.statValue}>{stat.value}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;