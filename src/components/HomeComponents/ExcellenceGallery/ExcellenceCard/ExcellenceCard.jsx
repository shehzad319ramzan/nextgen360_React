import React, { useState } from "react";
import styles from "./ExcellenceCard.module.scss";
import Loader from "@/components/common/Loader/Loader";

const ExcellenceCard = ({ image, years, text, isExpanded, onHover }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={`${styles.excellenceCard} ${
                isExpanded ? styles.expanded : ""
            }`}
            onMouseEnter={onHover}
            style={{ position: "relative" }}
        >
            {/* Loader until image is loaded */}
            {!isLoaded && (
                <div className='absolute inset-0 flex items-center justify-center bg-white/30 z-10'>
                    <Loader
                        size='sm'
                        fullscreen={false}
                    />
                </div>
            )}

            {/* Always render the image, but hide it until loaded */}
            <img
                src={image}
                alt='Excellence'
                onLoad={() => setIsLoaded(true)}
                style={{ visibility: isLoaded ? "visible" : "hidden" }}
            />

            {/* Show text overlay only after image is loaded */}
            {isLoaded && isExpanded && (
                <div className={styles.cardOverlay}>
                    <p className='text-[18px] md:text-[22px] font-[700]'>
                        {years}
                    </p>
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
};

export default ExcellenceCard;
