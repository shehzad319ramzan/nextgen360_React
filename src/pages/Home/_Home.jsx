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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/HomeImgs/HeroBackgroundImg.png";
import Lenis from "@studio-freight/lenis";
import { useData } from "@/context/DataContext";

const getMediaType = (filename = "") => {
  if (!filename) return "unknown";

  const ext = filename.split(".").pop().toLowerCase();
  const imageExts = ["jpeg", "jpg", "png", "gif", "svg", "tiff", "ico", "dvu"];
  const videoExts = ["mpeg", "mp4", "mov", "wmv", "avi", "flv"];
  const audioExts = ["mp3", "wav", "ogg"];
  const fileExts = ["csv", "zip", "pdf", "xls", "xlsx", "json"];

  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  if (audioExts.includes(ext)) return "audio";
  if (fileExts.includes(ext)) return "file";

  return "unknown";
};

const Home = () => {
  const data = useData();
  const [googleReviews, setGoogleReviews] = useState([]);
  const [googleRating, setGoogleRating] = useState(null);

  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis({ duration: 2, smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // ✅ Use window.google instead of fetch()
    function fetchGoogleReviews() {
      if (!window.google) {
        console.error("Google Maps JS API not loaded");
        return;
      }

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(
        {
          placeId: import.meta.env.VITE_GOOGLE_PLACE_ID,
          fields: ["name", "rating", "reviews"],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setGoogleReviews(place.reviews || []);
            setGoogleRating(place.rating || null);
            console.log("Fetched reviews:", place.reviews);
          } else {
            console.error("PlacesService error:", status);
          }
        }
      );
    }

    fetchGoogleReviews();

    return () => lenis.destroy();
  }, []);

  const heroMedia =
    data.initial_screen && data.initial_screen?.images.length > 0
      ? `${import.meta.env.VITE_BACKEND_URL}${
          data.initial_screen?.images[0]?.images.url
        }`
      : bgImage;

  const mediaType = getMediaType(heroMedia);

  return (
    <div className={styles.home}>
      <section
        className={styles.hero}
        style={
          mediaType === "image" ? { backgroundImage: `url(${heroMedia})` } : {}
        }
      >
        {mediaType === "video" && (
          <video
            className={styles.heroVideo}
            src={heroMedia}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        <div className={styles.heroFrame}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Tech Solutions Pro</h1>
            <p className={styles.heroSubtitle}>
              {data.initial_screen?.sub_title}
            </p>
          </div>
          <div className="flex gap-4 mt-5">
            <Button
              variant={"primary"}
              size="lg"
              className={"rounded-full"}
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant={"primary"}
              className={"rounded-full hover:cursor-pointer"}
              onClick={() => {
                const servicesSection = document.getElementById("services");
                servicesSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>

      <div className={styles.scrollContent}>
        <div className="container mx-auto pt-28 pb-8 px-5 md:px-8">
          <ClientSlider data={data} />
          <WhoWeAre data={data} />
        </div>
        <div className={styles.discoverWrapper}>
          <IndustryShowcase data={data} />
        </div>
        <ExcellenceGallery data={data} />

        <div id="services">
          <ServicesGrid data={data} />
        </div>

        <Testimonials
          googleReviews={googleReviews}
          googleRating={googleRating}
          businessName="Tech Solutions Pro | Digital Marketing & IT Services Nottingham UK"
        />

        <AwardsCertifications data={data} />
        <Registered data={data} />
        <ProjectInquiryForm />
      </div>
    </div>
  );
};

export default Home;
