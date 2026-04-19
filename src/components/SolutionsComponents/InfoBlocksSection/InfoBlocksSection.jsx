import React from "react";
import styles from "./InfoBlocksSection.module.scss";

const InfoBlock = ({ icon, title, description }) => {
    return (
        <div className={styles.infoBlock}>
            <div className={styles.iconContainer}>
                <img src={icon} alt="Icon" className={styles.iconImg} />
            </div>
            <h3 className={styles.blockTitle}>{title}</h3>
            <p className={styles.blockDescription}>{description}</p>
        </div>
    );
};

const InfoBlocksSection = ({ blocks }) => {
    return (
        <div className={styles.blocksContainer}>
            {blocks.map((block, index) => (
                <InfoBlock
                    key={index}
                    icon={block.icon}
                    title={block.title}
                    description={block.description}
                />
            ))}
        </div>
    );
};

export default InfoBlocksSection;