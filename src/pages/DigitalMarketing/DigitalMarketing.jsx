import styles from "./DigitalMarketing.module.scss";
import { marketingData } from "@/data/marketingData";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import HeroSection from "@/components/DigitalMarketingComponents/HeroSection/HeroSection";
import ServicesSection from "@/components/DigitalMarketingComponents/ServicesSection/ServicesSection";
import ProcessStepsSection from "@/components/ServicesComponents/ProcessStepsSection/ProcessStepsSection";
import styles1 from "../Services/Services.module.scss";
import TechStackSection from "@/components/ServicesComponents/TechStackSection/TechStackSection";
import React from "react";

const DigitalMarketing = () => {
    return (
        <>
            <PageSEO page="digital-marketing" fallback={{ path: "/digital-marketing" }} />
            <div className={styles.digitalMarketingContainer}>
                <HeroSection
                    tag={marketingData.hero.tag}
                    title="Our Digital Marketing Services"
                    description={marketingData.hero.description}
                    sideInfo={marketingData.heroSideInfo}
                />
                <div className='mt-10 md:mt-12'>
                    <ServicesSection servicesData={marketingData.servicesData} />
                </div>
            </div>
            <div className={styles1.servicesContainer}>
                <ProcessStepsSection
                    title={marketingData.sliderData.title}
                    description={marketingData.sliderData.description}
                    steps={marketingData.sliderData.blocks}
                />
                <TechStackSection
                    title={marketingData.techStackSection.title}
                    description={marketingData.techStackSection.description}
                    techLogos={marketingData.techStackSection.techLogos}
                />
            </div>
        </>
    );
};

export default DigitalMarketing;
