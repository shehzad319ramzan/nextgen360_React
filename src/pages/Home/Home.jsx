// import React, { useEffect, useState, useRef } from "react";
// import styles from "./Home.module.scss";
// import ClientSlider from "../../components/HomeComponents/ClientSlider/ClientSlider";
// import WhoWeAre from "../../components/HomeComponents/WhoWeAre/WhoWeAre";
// import IndustryShowcase from "@/components/HomeComponents/IndustryShowcase/IndustryShowcase";
// import ExcellenceGallery from "@/components/HomeComponents/ExcellenceGallery/ExcellenceGallery";
// import ServicesGrid from "@/components/HomeComponents/ServicesGrid/ServicesGrid";
// import Testimonials from "@/components/HomeComponents/Testimonials/Testimonials";
// import AwardsCertifications from "@/components/HomeComponents/AwardsCertifications/AwardsCertifications";
// import Registered from "@/components/HomeComponents/Registered/Registered";
// import ProjectInquiryForm from "@/components/HomeComponents/ProjectInquiryForm/ProjectInquiryForm";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import bgImage from "../../assets/images/HomeImgs/HeroBackgroundImg.png";
// import Lenis from "@studio-freight/lenis";
// import { useData } from "@/context/DataContext";
// import WeightLossImage from "@/assets/images/HomeImgs/HomeProductImages/weightLossImage.png";
// import ERPImage from "@/assets/images/HomeImgs/HomeProductImages/erpImage.png";
// import HRMSImage from "@/assets/images/HomeImgs/HomeProductImages/hrmsImage.png";
// import InsuranceImage from "@/assets/images/HomeImgs/HomeProductImages/insuranceImage.png";
// import WeightLossBgImage from "@/assets/images/HomeImgs/HomeProductBackgroundImages/weightLossBg.png";
// import ERPBgImage from "@/assets/images/HomeImgs/HomeProductBackgroundImages/erpBg.png";
// import HRMSBgImage from "@/assets/images/HomeImgs/HomeProductBackgroundImages/hrmsBg.png";
// import InsuranceBgImage from "@/assets/images/HomeImgs/HomeProductBackgroundImages/insuranceBg.png";

// const getMediaType = (filename = "") => {
//   if (!filename) return "unknown";

//   const ext = filename.split(".").pop().toLowerCase();
//   const imageExts = ["jpeg", "jpg", "png", "gif", "svg", "tiff", "ico", "dvu"];
//   const videoExts = ["mpeg", "mp4", "mov", "wmv", "avi", "flv"];
//   const audioExts = ["mp3", "wav", "ogg"];
//   const fileExts = ["csv", "zip", "pdf", "xls", "xlsx", "json"];

//   if (imageExts.includes(ext)) return "image";
//   if (videoExts.includes(ext)) return "video";
//   if (audioExts.includes(ext)) return "audio";
//   if (fileExts.includes(ext)) return "file";

//   return "unknown";
// };

// const Home = () => {
//   const data = useData();
//   const [googleReviews, setGoogleReviews] = useState([]);
//   const [googleRating, setGoogleRating] = useState(null);
//   const [activeTab, setActiveTab] = useState("Healthcare");
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const videoRef = useRef(null);

//   // Tab content configuration
//   const tabContent = {
//     Healthcare: {
//       title: "Simplifying Technology, Amplifying Healthcare",
//       subtitle:
//         "Delivering innovative healthcare solutions that improve patient care:",
//       background:
//         "linear-gradient(135deg, #fce7f3 0%, #ffffff 50%, #f8fafc 100%)",
//       backgroundImage: WeightLossBgImage,
//       accentColor: "#ec4899",
//       description:
//         "Transform healthcare delivery with cutting-edge technology solutions",
//       image: WeightLossImage,
//     },
//     ERP: {
//       title: "Innovating Today for a Smarter Tomorrow.",
//       subtitle: "Streamlining enterprise processes for maximum efficiency:",
//       background:
//         "linear-gradient(135deg, #f3e8ff 0%, #ffffff 50%, #faf5ff 100%)",
//       backgroundImage: ERPBgImage,
//       accentColor: "#8b5cf6",
//       description:
//         "Comprehensive ERP solutions that integrate all business functions",
//       image: ERPImage,
//     },
//     HRMS: {
//       title: "Powering Growth with Technology",
//       subtitle: "Empowering HR teams with intelligent workforce management:",
//       background:
//         "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f9fafb 100%)",
//       backgroundImage: HRMSBgImage,
//       accentColor: "#4FD1C5",
//       description:
//         "Modern HRMS platforms that enhance employee experience and productivity",
//       image: HRMSImage,
//     },
//     Insurance: {
//       title: "Transforming Challenges into Opportunities",
//       subtitle: "Revolutionizing insurance with digital-first solutions:",
//       background:
//         "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #f0f9ff 100%)",
//       backgroundImage: InsuranceBgImage,
//       accentColor: "#3b82f6",
//       description:
//         "Advanced insurance technology for better risk management and customer service",
//       image: InsuranceImage,
//     },
//   };

//   useEffect(() => {
//     // Smooth scrolling
//     const lenis = new Lenis({ duration: 2, smooth: true });
//     const raf = (time) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);

//     // ✅ Use window.google instead of fetch()
//     function fetchGoogleReviews() {
//       if (!window.google) {
//         console.error("Google Maps JS API not loaded");
//         return;
//       }

//       const service = new window.google.maps.places.PlacesService(
//         document.createElement("div")
//       );

//       service.getDetails(
//         {
//           placeId: import.meta.env.VITE_GOOGLE_PLACE_ID,
//           fields: ["name", "rating", "reviews"],
//         },
//         (place, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             setGoogleReviews(place.reviews || []);
//             setGoogleRating(place.rating || null);
//           } else {
//             console.error("PlacesService error:", status);
//           }
//         }
//       );
//     }

//     fetchGoogleReviews();

//     return () => lenis.destroy();
//   }, []);

//   // Auto-cycling tabs
//   useEffect(() => {
//     const tabKeys = Object.keys(tabContent);

//     const interval = setInterval(() => {
//       setActiveTab((currentTab) => {
//         const currentIndex = tabKeys.indexOf(currentTab);
//         const nextIndex = (currentIndex + 1) % tabKeys.length;
//         return tabKeys[nextIndex];
//       });
//     }, 5000); // 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const heroMedia =
//     data.initial_screen && data.initial_screen?.images.length > 0
//       ? `${import.meta.env.VITE_BACKEND_URL}${
//           data.initial_screen?.images[0]?.images.url
//         }`
//       : bgImage;

//   const mediaType = getMediaType(heroMedia);
//   console.log(heroMedia);

//   // Video handling functions
//   const handlePlayVideo = async () => {
//     setShowVideoModal(true);
//     setIsVideoPlaying(true);

//     // Wait for the video to be rendered, then request fullscreen
//     setTimeout(async () => {
//       if (videoRef.current) {
//         try {
//           if (videoRef.current.requestFullscreen) {
//             await videoRef.current.requestFullscreen();
//           } else if (videoRef.current.webkitRequestFullscreen) {
//             await videoRef.current.webkitRequestFullscreen();
//           } else if (videoRef.current.msRequestFullscreen) {
//             await videoRef.current.msRequestFullscreen();
//           }
//         } catch (error) {
//           console.log("Fullscreen not supported or denied:", error);
//         }
//       }
//     }, 100);
//   };

//   const handleCloseVideo = () => {
//     setShowVideoModal(false);
//     setIsVideoPlaying(false);
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;

//       // Exit fullscreen if active
//       if (document.fullscreenElement) {
//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) {
//           document.webkitExitFullscreen();
//         } else if (document.msExitFullscreen) {
//           document.msExitFullscreen();
//         }
//       }
//     }
//   };

//   const handleVideoEnd = () => {
//     setIsVideoPlaying(false);
//     setShowVideoModal(false);

//     // Exit fullscreen when video ends
//     if (document.fullscreenElement) {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }
//     }
//   };

//   // Handle escape key and fullscreen changes
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape" && showVideoModal) {
//         handleCloseVideo();
//       }
//     };

//     const handleFullscreenChange = () => {
//       // If user exits fullscreen using browser controls, close the video
//       if (!document.fullscreenElement && showVideoModal) {
//         handleCloseVideo();
//       }
//     };

//     if (showVideoModal) {
//       document.addEventListener("keydown", handleEscape);
//       document.addEventListener("fullscreenchange", handleFullscreenChange);
//       document.addEventListener(
//         "webkitfullscreenchange",
//         handleFullscreenChange
//       );
//       document.addEventListener("mozfullscreenchange", handleFullscreenChange);
//       document.addEventListener("MSFullscreenChange", handleFullscreenChange);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener(
//         "webkitfullscreenchange",
//         handleFullscreenChange
//       );
//       document.removeEventListener(
//         "mozfullscreenchange",
//         handleFullscreenChange
//       );
//       document.removeEventListener(
//         "MSFullscreenChange",
//         handleFullscreenChange
//       );
//       document.body.style.overflow = "unset";
//     };
//   }, [showVideoModal]);

//   const currentTab = tabContent[activeTab];

//   return (
//     <div className={styles.home}>
//       <section
//         className={styles.hero}
//         style={{
//           background: `url(${currentTab.backgroundImage}) center/cover no-repeat`,
//         }}
//       >
//         <div className={styles.heroContainer}>
//           {/* Left Section - Text and Navigation */}
//           <div className={styles.heroLeft}>
//             <h1 className={styles.heroTitle}>
//               {activeTab === "Healthcare" && (
//                 <>
//                   Simplifying Technology,{" "}
//                   <span
//                     style={{
//                       color: currentTab.accentColor,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Amplifying
//                   </span>{" "}
//                   Business
//                 </>
//               )}
//               {activeTab === "ERP" && (
//                 <>
//                   <span
//                     style={{
//                       color: currentTab.accentColor,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Innovating
//                   </span>{" "}
//                   Today for a Smarter Tomorrow.
//                 </>
//               )}
//               {activeTab === "HRMS" && (
//                 <>
//                   Powering Growth with{" "}
//                   <span
//                     style={{
//                       color: currentTab.accentColor,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Technology
//                   </span>
//                 </>
//               )}
//               {activeTab === "Insurance" && (
//                 <>
//                   <span
//                     style={{
//                       color: currentTab.accentColor,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Transforming
//                   </span>{" "}
//                   Challenges into Opportunities
//                 </>
//               )}
//             </h1>

//             <div className={styles.navigationButtons}>
//               {Object.keys(tabContent).map((tab) => (
//                 <button
//                   key={tab}
//                   className={`${styles.navButton} ${
//                     activeTab === tab ? styles.active : ""
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                   style={{
//                     backgroundColor:
//                       activeTab === tab ? currentTab.accentColor : "#f3f4f6",
//                     color: activeTab === tab ? "white" : "#6b7280",
//                   }}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <p className={styles.tagline}>{currentTab.subtitle}</p>
//           </div>

//           {/* Right Section - Product Card */}
//           <div className={styles.heroRight}>
//             <div className={styles.productCard}>
//               {mediaType === "video" ? (
//                 <div className={styles.videoContainer}>
//                   <video
//                     ref={videoRef}
//                     src={heroMedia}
//                     className={styles.productVideo}
//                     poster={currentTab.image}
//                     onEnded={handleVideoEnd}
//                     preload="metadata"
//                   />
//                   <div className={styles.videoOverlay}>
//                     <button
//                       className={styles.playButton}
//                       onClick={handlePlayVideo}
//                       aria-label="Play video"
//                     >
//                       <svg
//                         width="80"
//                         height="80"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <circle
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           fill="rgba(0, 0, 0, 0.7)"
//                           stroke="white"
//                           strokeWidth="2"
//                         />
//                         <path d="M10 8L16 12L10 16V8Z" fill="white" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className={styles.videoContainer}>
//                   <img
//                     key={activeTab}
//                     src={currentTab.image}
//                     alt={`${activeTab} product showcase`}
//                     className={styles.productImage}
//                   />
//                   <div className={styles.videoOverlay}>
//                     <button
//                       className={styles.playButton}
//                       onClick={handlePlayVideo}
//                       aria-label="Play video"
//                     >
//                       <svg
//                         width="80"
//                         height="80"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <circle
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           fill="rgba(0, 0, 0, 0.7)"
//                           stroke="white"
//                           strokeWidth="2"
//                         />
//                         <path d="M10 8L16 12L10 16V8Z" fill="white" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         {/* <div className={styles.bottomNav}>
//           <a href="#" className={styles.bottomNavLink}>
//             Go to Healthcare Products →
//           </a>
//         </div> */}
//       </section>

//       <div className={styles.scrollContent}>
//         <div className="container mx-auto pt-4 pb-8 px-5 md:px-8">
//           <ClientSlider data={data} />
//           <WhoWeAre data={data} />
//         </div>
//         <div className={styles.discoverWrapper}>
//           <IndustryShowcase data={data} />
//         </div>
//         <ExcellenceGallery data={data} />

//         <div id="services">
//           <ServicesGrid data={data} />
//         </div>

//         <Testimonials
//           googleReviews={googleReviews}
//           googleRating={googleRating}
//           businessName="Tech Solutions Pro | Digital Marketing & IT Services Nottingham UK"
//         />

//         <AwardsCertifications data={data} />
//         <Registered data={data} />
//         <ProjectInquiryForm />
//       </div>

//       {/* Fullscreen Video */}
//       {showVideoModal && (
//         <video
//           ref={videoRef}
//           src={heroMedia}
//           className={styles.fullscreenVideo}
//           controls
//           autoPlay
//           onEnded={handleVideoEnd}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             zIndex: 9999,
//             background: "black",
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;





import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import ClientSlider from "../../components/HomeComponents/ClientSlider/ClientSlider";
import WhoWeAre from "../../components/HomeComponents/WhoWeAre/WhoWeAre";
import IndustryShowcase from "@/components/HomeComponents/IndustryShowcase/IndustryShowcase";
import ExcellenceGallery from "@/components/HomeComponents/ExcellenceGallery/ExcellenceGallery";
import ServicesGrid from "@/components/HomeComponents/ServicesGrid/ServicesGrid";
import Testimonials from "@/components/HomeComponents/Testimonials/Testimonials";
import AwardsCertifications from "@/components/HomeComponents/AwardsCertifications/AwardsCertifications";
import Registered from "@/components/HomeComponents/Registered/Registered";
import ProjectInquiryForm from "@/components/HomeComponents/ProjectInquiryForm/ProjectInquiryForm";
import HeroComponent from "@/components/Hero/HeroComponent";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import CaseStudies from "@/components/HomeComponents/CaseStudies/CaseStudies";

const Home = () => {
  const [googleReviews, setGoogleReviews] = useState([]);
  const [googleRating, setGoogleRating] = useState(null);
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [googleTotal, setGoogleTotal] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/google-reviews`)
      .then((r) => r.json())
      .then((d) => {
        setGoogleReviews(Array.isArray(d.reviews) ? d.reviews : []);
        setGoogleRating(d.rating ?? null);
        setGoogleReviewUrl(d.url || "");
        setGoogleTotal(d.total ?? 0);
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.home}>
      <PageSEO page="home" fallback={{ path: "/" }} />
      <HeroComponent />

      <div className={styles.scrollContent}>
        <div className="container mx-auto pt-4 pb-8 px-5 md:px-8">
          <WhoWeAre />
        </div>
        <CaseStudies />
        <div className={styles.discoverWrapper}>
          <IndustryShowcase />
        </div>
        <ExcellenceGallery />

        <div id="services">
          <ServicesGrid />
        </div>

        <Testimonials
          googleReviews={googleReviews}
          googleRating={googleRating}
          googleReviewUrl={googleReviewUrl}
          googleTotal={googleTotal}
          businessName="Tech Solutions Pro | Digital Marketing & IT Services Nottingham UK"
        />

        <AwardsCertifications />
        <Registered />
        <ClientSlider />
        <ProjectInquiryForm />
        <div className="h-16 md:h-24 bg-white" />
      </div>
    </div>
  );
};

export default Home;
