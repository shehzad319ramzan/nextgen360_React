// import React, { useEffect, useState } from "react";
// import styles from "./Services.module.scss";
// import HeroSection from "@/components/ServicesComponents/HeroSection/HeroSection";
// import InfoBlocksSection from "@/components/ServicesComponents/InfoBlocksSection/InfoBlocksSection";
// import StatsSection from "@/components/ServicesComponents/StatsSection/StatsSection";
// import { servicesData } from "@/data/servicesData";
// import { useParams } from "react-router-dom";
// import ProcessStepsSection from "@/components/ServicesComponents/ProcessStepsSection/ProcessStepsSection";
// import TechStackSection from "@/components/ServicesComponents/TechStackSection/TechStackSection";
// import Loader from "@/components/common/Loader/Loader";

// const Services = () => {
//     const { category, service } = useParams();
//     const [pageData, setPageData] = useState(null);

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const slugToCamelCase = (slug) => {
//             return slug
//                 .replace(/&/g, "")
//                 .replace(/\s+/g, "")
//                 .split("-")
//                 .map((word, index) =>
//                     index === 0
//                         ? word.toLowerCase()
//                         : word.charAt(0).toUpperCase() + word.slice(1)
//                 )
//                 .join("");
//         };
//         const dataKey = slugToCamelCase(service);
//         setPageData(servicesData[dataKey] || servicesData.webDevelopment);
//         (async () => {
//             const response = await fetch(
//                 `${
//                     import.meta.env.VITE_BACKEND_URL_API
//                 }/service-pages/single?category=${category}&slug=${service}`
//             );
//             const response_json = await response.json();

//             if (response_json) {
//                 if (response_json.data.length > 0) {
//                     setData(response_json.data[0]);
//                 } else {
//                     setData([]);
//                 }
//             }
//         })();
//         return () => {};
//     }, [service]);

//     const slugToReadableText = (slug) => {
//         return slug
//             .split("-")
//             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(" ")
//             .replace("E Commerce", "E-commerce");
//     };

//     const categoryName = slugToReadableText(category);

//     if (data.length == 0) {
//         return (
//             <Loader
//                 fullscreen
//                 size='lg'
//             />
//         );
//     }

//     return (
//         <div className={styles.servicesContainer}>
//             <HeroSection
//                 category={categoryName}
//                 title={data.initial_hero.sub_title}
//                 description={data.initial_hero.description}
//                 sideInfo={data.initial_hero_2}
//             />
//             <div className={styles.infoSectionContainer}>
//                 <h2 className='text-center text-[20px] md:text-[24px] lg:text-[28px] font-[600] text-[#1E1E1E] mb-6 md:mb-8'>
//                     {data.icons_with_text.title}
//                 </h2>
//                 <InfoBlocksSection blocks={data.icons_with_text.icons} />
//             </div>
//             <ProcessStepsSection
//                 title={data.developing_testing.title}
//                 description={data.developing_testing.description}
//                 steps={data.developing_testing.images}
//             />
//             <TechStackSection
//                 title={data.technologies_with_icons.title}
//                 description={data.technologies_with_icons.description}
//                 techLogos={data.service_icons}
//             />
//             <StatsSection data={data.text_with_image} />
//         </div>
//     );
// };

// export default Services;





// Services.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Services.module.scss";
import HeroSection from "@/components/ServicesComponents/HeroSection/HeroSection";
import InfoBlocksSection from "@/components/ServicesComponents/InfoBlocksSection/InfoBlocksSection";
import StatsSection from "@/components/ServicesComponents/StatsSection/StatsSection";
import ProcessStepsSection from "@/components/ServicesComponents/ProcessStepsSection/ProcessStepsSection";
import TechStackSection from "@/components/ServicesComponents/TechStackSection/TechStackSection";
import Loader from "@/components/common/Loader/Loader";

import { servicesData } from "@/data/servicesData";
import PageSEO from "@/components/common/PageSEO/PageSEO";

const Services = () => {
  const { category, service } = useParams();
  const [pageData, setPageData] = useState(null);

  // Convert slug to camelCase to match servicesData keys
  const slugToCamelCase = (slug) => {
    return slug
      .replace(/&/g, "")
      .replace(/\s+/g, "")
      .split("-")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  useEffect(() => {
    const dataKey = slugToCamelCase(service);
    const selectedData = servicesData[dataKey] || servicesData.webDevelopment;
    setPageData(selectedData);
  }, [service]);

  // Convert slug to readable text (for category title)
  const slugToReadableText = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace("E Commerce", "E-commerce");
  };

  const categoryName = slugToReadableText(category);

  if (!pageData) {
    return <Loader fullscreen size="lg" />;
  }

  return (
    <div>
      <PageSEO page={`service-${service}`} fallback={{ path: `/services/${category}/${service}` }} />
      {/* Hero Section */}
      <HeroSection
        category={categoryName}
        title={pageData.hero.title}
        description={pageData.hero.description}
        sideInfo={pageData.sideInfo}
      />

      {/* Info Blocks Section */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-14 md:py-20">
        <div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[2px] w-6 rounded-full" style={{ background: "#0a1f3f" }} />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#388ECA" }}>
              What We Offer
            </span>
            <div className="h-[2px] w-6 rounded-full" style={{ background: "#0a1f3f" }} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight" style={{ color: "#0F4C8F" }}>
            {pageData.infoSection.title}
          </h2>
        </div>
        <InfoBlocksSection blocks={pageData.infoSection.blocks} />
      </div>

      {/* Process Steps Section */}
      <ProcessStepsSection
        title={pageData.processStepsSection.title}
        description={pageData.processStepsSection.description}
        steps={pageData.processStepsSection.blocks}
      />

      {/* Tech Stack Section */}
      <TechStackSection
        title={pageData.techStackSection.title}
        description={pageData.techStackSection.description}
        techLogos={pageData.techStackSection.techLogos}
      />

      {/* Stats Section */}
      {pageData.text_with_image && <StatsSection data={pageData.text_with_image} />}
    </div>
  );
};

export default Services;
