import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Public pages
import Home from "../pages/Home/Home";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Services from "@/pages/Services/Services";
import Solutions from "@/pages/Solutions/Solutions";
import DigitalMarketing from "@/pages/DigitalMarketing/DigitalMarketing";
import Careers from "@/pages/Careers/Careers";
import About from "@/pages/About/About";
import BlogList from "@/pages/Blog/BlogList";
import BlogDetail from "@/pages/Blog/BlogDetail";
import PortfolioList from "@/pages/Portfolio/PortfolioList";
import PortfolioDetail from "@/pages/Portfolio/PortfolioDetail";
import CaseStudyDetail from "@/pages/CaseStudies/CaseStudyDetail";
import Apply from "@/pages/Careers/Apply";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import JobApplications from "@/pages/Admin/JobApplications/JobApplications";

// Admin
import AdminLogin from "@/pages/Admin/Login/Login";
import AdminLayout from "@/pages/Admin/AdminLayout";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import Analytics from "@/pages/Admin/Analytics/Analytics";
import Inquiries from "@/pages/Admin/Inquiries/Inquiries";
import SEO from "@/pages/Admin/SEO/SEO";
import Blogs from "@/pages/Admin/Blogs/Blogs";
import Jobs from "@/pages/Admin/Jobs/Jobs";
import Testimonials from "@/pages/Admin/Testimonials/Testimonials";
import Team from "@/pages/Admin/Team/Team";
import Portfolio from "@/pages/Admin/Portfolio/Portfolio";
import CaseStudies from "@/pages/Admin/CaseStudies/CaseStudies";
import AdminSolutions from "@/pages/Admin/Solutions/Solutions";
import Newsletter from "@/pages/Admin/Newsletter/Newsletter";
import Media from "@/pages/Admin/Media/Media";
import ActivityLog from "@/pages/Admin/ActivityLog/ActivityLog";
import Users from "@/pages/Admin/Users/Users";
import Settings from "@/pages/Admin/Settings/Settings";
import RobotsTxt from "@/pages/Admin/RobotsTxt/RobotsTxt";
import HtAccess from "@/pages/Admin/HtAccess/HtAccess";
import RequireAuth from "@/pages/Admin/RequireAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/services/:category/:service" element={<Services />} />
        <Route path="/solutions/:solution" element={<Solutions />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/portfolio" element={<PortfolioList />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/careers/apply/:jobId" element={<Apply />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<RequireAuth module="dashboard"><Dashboard /></RequireAuth>} />
        <Route path="analytics" element={<RequireAuth module="analytics"><Analytics /></RequireAuth>} />
        <Route path="inquiries" element={<RequireAuth module="inquiries"><Inquiries /></RequireAuth>} />
        <Route path="seo" element={<RequireAuth module="seo"><SEO /></RequireAuth>} />
        <Route path="robots-txt" element={<RequireAuth module="robots-txt"><RobotsTxt /></RequireAuth>} />
        <Route path="htaccess" element={<RequireAuth module="htaccess"><HtAccess /></RequireAuth>} />
        <Route path="blogs" element={<RequireAuth module="blogs"><Blogs /></RequireAuth>} />
        <Route path="jobs" element={<RequireAuth module="jobs"><Jobs /></RequireAuth>} />
        <Route path="job-applications" element={<RequireAuth module="job-applications"><JobApplications /></RequireAuth>} />
        <Route path="testimonials" element={<RequireAuth module="testimonials"><Testimonials /></RequireAuth>} />
        <Route path="team" element={<RequireAuth module="team"><Team /></RequireAuth>} />
        <Route path="portfolio" element={<RequireAuth module="portfolio"><Portfolio /></RequireAuth>} />
        <Route path="case-studies" element={<RequireAuth module="case-studies"><CaseStudies /></RequireAuth>} />
        <Route path="solutions" element={<RequireAuth module="solutions"><AdminSolutions /></RequireAuth>} />
        <Route path="newsletter" element={<RequireAuth module="newsletter"><Newsletter /></RequireAuth>} />
        <Route path="media" element={<RequireAuth module="media"><Media /></RequireAuth>} />
        <Route path="activity-log" element={<RequireAuth module="activity-log"><ActivityLog /></RequireAuth>} />
        <Route path="users" element={<RequireAuth module="users"><Users /></RequireAuth>} />
        <Route path="settings" element={<RequireAuth module="settings"><Settings /></RequireAuth>} />
      </Route>
    </Routes>
  );
};
