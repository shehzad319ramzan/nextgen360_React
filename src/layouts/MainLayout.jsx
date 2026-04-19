import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";
import NewsletterPopup from "@/components/common/NewsletterPopup/NewsletterPopup";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[50px] sm:pt-[6px] md:pt-[60px]">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <NewsletterPopup />
    </>
  );
};

export default MainLayout;
