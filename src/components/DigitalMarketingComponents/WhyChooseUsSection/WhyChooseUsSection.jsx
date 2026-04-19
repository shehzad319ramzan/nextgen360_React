import React, { useState, useEffect } from "react";
import styles from "./WhyChooseUsSection.module.scss";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { GiTrophyCup } from "react-icons/gi";

const WhyChooseUsSection = ({ sliderData }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const visibleCards = 3;

    useEffect(() => {
        // Left arrow should be disabled when first slide is showing
        setCanScrollLeft(currentSlide > 0);

        // Right arrow should be disabled when last slide is showing
        // or when there aren't enough slides to scroll
        setCanScrollRight(
            sliderData.length > visibleCards &&
            currentSlide < sliderData.length - visibleCards
        );
    }, [currentSlide, sliderData.length]);

    const handleSlideChange = (direction) => {
        if (direction === "next" && canScrollRight) {
            setCurrentSlide((prev) => prev + 1);
        } else if (direction === "prev" && canScrollLeft) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    return (
        <div className={styles.whyChooseUsSectionContainer}>
            <h2 className={styles.sectionTitle}>
                Why Choose <span className={styles.highlight}>Tech Solutions Pro</span> For
                <br />
                <span className={styles.highlight}>Digital Marketing Services</span>
            </h2>

            <div className={styles.sliderControls}>
                <button
                    onClick={() => handleSlideChange("prev")}
                    className={`${styles.sliderButton} ${!canScrollLeft ? styles.disabled : ""}`}
                    disabled={!canScrollLeft}
                    aria-label="Previous slide"
                >
                    <FiArrowLeftCircle size={32} />
                </button>
                <button
                    onClick={() => handleSlideChange("next")}
                    className={`${styles.sliderButton} ${!canScrollRight ? styles.disabled : ""}`}
                    disabled={!canScrollRight}
                    aria-label="Next slide"
                >
                    <FiArrowRightCircle size={32} />
                </button>
            </div>

            <div className={styles.cardsContainer}>
                {sliderData
                    .slice(currentSlide, currentSlide + visibleCards)
                    .map((slide) => (
                        <div key={slide.id} className={styles.card}>
                            <div className={styles.cardIconContainer}>
                                <GiTrophyCup color="#FFFFFF" className={styles.cardIcon} />
                            </div>
                            <h3 className={styles.cardTitle}>{slide.title}</h3>
                            <p className={styles.cardContent}>{slide.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WhyChooseUsSection;