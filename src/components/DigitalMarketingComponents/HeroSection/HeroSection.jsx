import React, { useState } from "react";
import styles from "./HeroSection.module.scss";
import { cn } from "@/lib/utils";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const HeroSection = ({ tag, title, description, sideInfo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sideInfo?.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div
      className={cn(
        styles.heroContainer,
        "w-full flex flex-col lg:flex-row gap-10 md:gap-12"
      )}
    >
      <div className={cn(styles.leftPanel, "lg:w-2/3")}>
        <div className={styles.badge}>
          <span>{tag}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className="md:ps-6">
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={cn(styles.rightPanel, "lg:w-1/3")}>
        <div className={styles.slidesDetailCard}>
          <div className={styles.cardBadge}>
            {sideInfo[currentSlide]?.title}
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>
              {sideInfo[currentSlide]?.sub_title}
            </h2>
            <p className={styles.cardText}>
              {sideInfo[currentSlide]?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            {/* Dots */}
            <div className="flex space-x-2">
              {sideInfo?.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentSlide ? "bg-[#0F4C8F]" : "bg-[#FFFFFF]"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
              {currentSlide !== 0 && (
                <button onClick={prevSlide} className="cursor-pointer">
                  <FiArrowLeftCircle size={32} color="#FFFFFF" />
                </button>
              )}
              {currentSlide !== totalSlides - 1 && (
                <button onClick={nextSlide} className="cursor-pointer">
                  <FiArrowRightCircle size={32} color="#FFFFFF" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
