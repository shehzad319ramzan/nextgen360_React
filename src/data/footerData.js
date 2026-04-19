import {
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

import StrategyIcon from "../assets/images/HeaderImgs/ServicesIcon01.svg";
import SoftwareIcon from "../assets/images/HeaderImgs/ServicesIcon02.svg";
import PerformanceIcon from "../assets/images/HeaderImgs/ServicesIcon03.svg";
import AIIcon from "../assets/images/HeaderImgs/ServicesIcon04.svg";
import BusinessIcon from "../assets/images/HeaderImgs/ServicesIcon05.svg";
import EngagementIcon from "../assets/images/HeaderImgs/ServicesIcon06.svg";
import SolutionsViewImg from "../assets/images/HeaderImgs/SolutionsViewImg.svg";

export const footerContactBox = {
    contactNumber: "01157950428",
    email: "admin@tech-solutionspro.com",
    socialLinks: [
        {
            href: "https://www.linkedin.com/company/tech-solutions-pro/",
            Icon: FaLinkedinIn,
        },
        {
            href: "https://www.facebook.com/techsoltionspro?mibextid=ZbWKwL",
            Icon: FaFacebookF,
        },
        {
            href: "https://www.instagram.com/tsp_techsolutionspro/",
            Icon: FaInstagram,
        },
        {
            href: "https://www.youtube.com/channel/UCBQSZ7nAkHEopSGCB26ZPDw/",
            Icon: FaYoutube,
        },
    ],
};

export const servicesLinks = {
    title: "Services",
    links: [
        {
            category: "Custom Development",
            name: "Web Development",
            url: "/services/custom-development/web-development",
        },
        {
            category: "Custom Development",
            name: "Mobile App Development",
            url: "/services/custom-development/mobile-app-development",
        },
          {
            category: "Custom Development",
            name: "Saas Development",
            url: "/services/custom-development/saas-development",
        },
        {
            category: "Custom Development",
            name: "MVP Development",
            url: "/services/custom-development/mvp-development",
        },
         {
            category: "Creative Design Studio",
            name: "UI/UX Design",
            url: "/services/creative-design-studio/ui-ux-design",
        },
        {
            category: "Creative Design Studio",
            name: "Product Design",
            url: "/services/creative-design-studio/product-design",
        },
        {
            category: "Creative Design Studio",
            name: "SaaS Application Design",
            url: "/services/creative-design-studio/saas-application-design",
        }, 
        {
            category: "Cloud & Automation",
            name: "Cloud & DevOps",
            url: "/services/cloud-automation/cloud-devops",
        },
        {
            category: "Cloud & Automation",
            name: "AI & Machine Learning",
            url: "/services/cloud-automation/ai-machine-learning",
        },
        
      
        // {
        //     category: "E-commerce & Online Stores",
        //     name: "Shopify & E-commerce Solutions",
        //     url: "/services/e-commerce-online-stores/shopify-e-commerce-solutions",
        // },
        // {
        //     category: "Digital Growth & Strategy",
        //     name: "Digital Marketing",
        //     url: "/digital-marketing",
        // },
       
        // {
        //     category: "Content & Communication",
        //     name: "Technical Content Writing",
        //     url: "/services/content-communication/technical-content-writing",
        // },
        // {
        //     category: "Digital Growth & Strategy",
        //     name: "SEO Optimization",
        //     url: "/services/digital-growth-strategy/seo-optimization",
        // },
    ],
};

export const servicesData = [
    {
        title: "Custom Development",
        icon: StrategyIcon,
        items: [
            {
                name: "Web Application Development",
                url: "/services/custom-development/web-development",
            },
            {
                name: "Mobile App Development",
                url: "/services/custom-development/mobile-app-development",
            },
            {
                name: "Saas Development",
                url: "/services/custom-development/saas-development",
            },
            {
                name: "MVP Development",
                url: "/services/custom-development/mvp-development",
            },
            // {
            //     name: "WordPress CMS Development",
            //     url: "/services/custom-development/wordpress-cms-development",
            // },
        ],
    },
    {
        title: "Creative Design Studio",
        icon: SoftwareIcon,
        items: [
            {
                name: "UI/UX Design",
                url: "/services/creative-design-studio/ui-ux-design",
            },
            {
                name: "Product Design",
                url: "/services/creative-design-studio/product-design",
            },
            {
                name: "Saas Application Design",
                url: "/services/creative-design-studio/saas-application-design",
            },
            // {
            //     name: "Graphic Design",
            //     url: "/services/creative-design-studio/graphic-design",
            // },
        ],
    },
    {
        title: "Cloud Automation",
        icon: PerformanceIcon,
        items: [
            {
                name: "Cloud DevOps",
                url: "/services/cloud-automation/cloud-devops",
            },
            {
                name: "AI Machine Learning",
                url: "/services/cloud-automation/ai-machine-learning",
            },
        ],
    },
    // {
    //     title: "E-commerce Online Stores",
    //     icon: AIIcon,
    //     items: [
    //         {
    //             name: "Shopify E-commerce Solutions",
    //             url: "/services/e-commerce-online-stores/shopify-e-commerce-solutions",
    //         },
    //     ],
    // },
    // {
    //     title: "Digital Growth Strategy",
    //     icon: BusinessIcon,
    //     items: [
    //         {
    //             name: "Digital Marketing",
    //             url: "/digital-marketing",
    //         },
    //         {
    //             name: "SEO Optimization",
    //             url: "/services/digital-growth-strategy/seo-optimization",
    //         },
    //     ],
    // },
    // {
    //     title: "Content Communication",
    //     icon: EngagementIcon,
    //     items: [
    //         {
    //             name: "Technical Content Writing",
    //             url: "/services/content-communication/technical-content-writing",
    //         },
    //     ],
    // },
];

export const industries = {
    title: "Industry",
    links: [
        { name: "E-commerce" },
        { name: "Fintech" },
        { name: "Real Estate" },
        { name: "Healthcare" },
        { name: "Food & Grocery" },
        { name: "Education" },
    ],
};

export const companyLinks = {
    title: "Company",
    links: [
        { name: "About us", url: "/aboutus" },
        { name: "Portfolio", url: "/portfolio" },
        { name: "Blog", url: "/blog" },
        { name: "Careers", url: "/careers" },
        { name: "Contact Us", url: "/contact" },
    ],
};
