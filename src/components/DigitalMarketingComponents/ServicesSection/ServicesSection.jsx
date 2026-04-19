import React, { useState } from "react";
import styles from "./ServicesSection.module.scss";
import { cn } from "@/lib/utils";
import DMServicesImg from "../../../assets/images/ServicesSolutionsImgs/DMServicesImg.svg";

const ServicesSection = ({ servicesData }) => {
  if (servicesData.length == 0) {
    return <></>;
  }
  const [activeService, setActiveService] = useState(servicesData[0].id);

  const handleServiceClick = (id) => {
    setActiveService(id);
  };

  return (
    <div className={styles.servicesSectionContainer}>
      <h2 className={styles.sectionTitle}>
        Our Top{" "}
        <span className={styles.highlight}>Digital Marketing Service</span>
      </h2>

      <div className="flex flex-col lg:flex-row w-full gap-6">
        <div className={cn(styles.servicesList, "lg:w-1/3")}>
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`${styles.serviceItem} ${
                activeService === service.id ? styles.activeService : ""
              }`}
              onClick={() => handleServiceClick(service.id)}
            >
              {service.title}
            </div>
          ))}
        </div>

        <div className={cn(styles.serviceContent, "lg:w-2/3")}>
          <div className={styles.iconContainer}>
            <img src={DMServicesImg} alt="DM Services Img" />
          </div>
          <p className={styles.serviceDescription}>
            {
              servicesData.find((service) => service.id === activeService)
                ?.description
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
