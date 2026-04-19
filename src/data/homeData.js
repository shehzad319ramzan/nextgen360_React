// Client Slider Data
const images = import.meta.glob(
  "../assets/images/HomeImgs/ClientsLogoIcons/ClientImg*.svg",
  { eager: true }
);

export const clientLogos = Object.values(images).map((img) => img.default);

// Who We Are Section Data
import WhoWeAreImg from "../assets/images/HomeImgs/WhoWeAreImg.svg";

export const whoWeAre = {
  heading: "Who We Are",
  title: `Our Trusted Tech Partners For Modern Solutions`,
  description: `Founded in 2019, NextGen360 has evolved into a powerhouse tech company. 
                With offices in Nottingham and Islamabad, our team of IT specialists, designers, and developers 
                devise cutting-edge solutions in web development and digital marketing. We amplify business growth and 
                secure success through pioneering technology, delivering measurable results with unwavering commitment.`,
  image: WhoWeAreImg,
};

// Industry Showcase Data
import HealthCareIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon01-HealthCare.svg";
import LawFirmsIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon02-LawFirms.svg";
import EcommerceIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon03-Ecommerce.svg";
import FoodIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon04-Food.svg";
import CooperateIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon05-Cooperate.svg";
import AutoMobileIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon06-AutoMobile.svg";
import EventIcon from "../assets/images/HomeImgs/IndustriesIcons/Icon07-Event.svg";

export const industryShowcase = {
  heading: "Driving Digital Success Across Industries",
  description: `We help industries flourish with powerful digital solutions. Whether it’s crafting 
                targeted ads to amplify sales, executing cost-effective marketing for stronger returns, or sculpting 
                dynamic WordPress sites, Shopify stores, and bespoke websites, we engineer solutions that command impact. 
                We prioritise real growth and stand poised to catapult your business ahead in the digital landscape.`,
};

export const industriesIcons = [
  {
    id: 1,
    top: "4%",
    left: "30%",
    icon: HealthCareIcon,
    title: "Health Care & Life Sciences",
  },
  { id: 2, top: "16%", left: "12%", icon: LawFirmsIcon, title: "Law Firms" },
  { id: 3, top: "44%", left: "6%", icon: EcommerceIcon, title: "E-commerce" },
  { id: 4, top: "78%", left: "22%", icon: FoodIcon, title: "Food industries" },
  { id: 5, top: "76%", left: "70%", icon: CooperateIcon, title: "Cooperate" },
  {
    id: 6,
    top: "52%",
    left: "82%",
    icon: AutoMobileIcon,
    title: "Auto Mobile Industry",
  },
  {
    id: 7,
    top: "14%",
    left: "78%",
    icon: EventIcon,
    title: "Event Management",
  },
];

// Excellence Gallery Data
import ExcellenceImg01 from "../assets/images/HomeImgs/ExcellenceImg01.svg";
import ExcellenceImg02 from "../assets/images/HomeImgs/ExcellenceImg02.svg";
import ExcellenceImg03 from "../assets/images/HomeImgs/ExcellenceImg03.svg";
import ExcellenceImg04 from "../assets/images/HomeImgs/ExcellenceImg04.svg";
import ExcellenceImg05 from "../assets/images/HomeImgs/ExcellenceImg05.svg";

export const excellenceGallery = [
  {
    src: ExcellenceImg01,
    years: "10+",
    text: "Years of experience driving brand growth through SEO.",
  },
  {
    src: ExcellenceImg02,
    years: "10+",
    text: "Years of building loyal communities on social media.",
  },
  {
    src: ExcellenceImg03,
    years: "10+",
    text: "Years of developing high-performance websites.",
  },
  {
    src: ExcellenceImg04,
    years: "10+",
    text: "Years of producing designs that truly represent your brand.",
  },
  {
    src: ExcellenceImg05,
    years: "10+",
    text: "Years of managing paid campaigns with measurable results",
  },
];

// Services Grid Data
import DigitalMarketingImg from "../assets/images/HomeImgs/DigitalMarketingImg.svg";

export const servicesHeader = {
  title: `Our Services`,
  description: `We’ve been delivering tailored solutions for years, ensuring every project is handled precisely and carefully. We are committed to providing innovative and effective strategies that support growth and help businesses thrive.`,
};

export const servicesGrid = [
  {
    id: 1,
    category: "Custom Development",
    title: "Web Development",
    image: DigitalMarketingImg,
    description:
      "Build fast, secure, and scalable websites and web apps using modern technologies tailored to your business goals.",
  },
  {
    id: 2,
    category: "Custom Development",
    title: "Mobile App Development",
    image: DigitalMarketingImg,
    description:
      "Create high-performance mobile apps for iOS and Android that deliver seamless user experiences and functionality.",
  },
  {
    id: 3,
    category: "Creative Design Studio",
    title: "UI/UX Design",
    image: DigitalMarketingImg,
    description:
      "Design intuitive and engaging user interfaces backed by research and usability best practices to boost conversion and satisfaction.",
  },
  {
    id: 4,
    category: "Cloud & Automation",
    title: "AI & Machine Learning",
    image: DigitalMarketingImg,
    description:
      "Leverage AI and ML solutions to automate processes, enhance decision-making, and unlock smart insights from your data.",
  },
  {
    id: 5,
    category: "Cloud & Automation",
    title: "Cloud & DevOps",
    image: DigitalMarketingImg,
    description:
      "Set up robust cloud infrastructure, CI/CD pipelines, and scalable systems with AWS, Azure, or GCP — ensuring speed, reliability, and efficiency.",
  },
  {
    id: 6,
    category: "Custom Development",
    title: "WordPress & CMS Development",
    image: DigitalMarketingImg,
    description:
      "Get custom WordPress or CMS websites built to match your brand, with full control over content and features.",
  },
  {
    id: 7,
    category: "E-commerce & Online Stores",
    title: "Shopify & E-commerce Solutions",
    image: DigitalMarketingImg,
    description:
      "Launch a beautiful and fully functional online store with Shopify or custom eCommerce platforms, optimized for growth and conversions.",
  },
  {
    id: 8,
    category: "Digital Growth & Strategy",
    title: "Digital Marketing",
    image: DigitalMarketingImg,
    description:
      "Drive traffic, leads, and sales with smart marketing strategies including ads, email marketing, and social media campaigns.",
  },
  {
    id: 9,
    category: "Creative Design Studio",
    title: "Graphic Design",
    image: DigitalMarketingImg,
    description:
      "Get stunning visuals that represent your brand — from logos and banners to brochures, pitch decks, and more.",
  },
  {
    id: 10,
    category: "Content & Communication",
    title: "Technical Content Writing",
    image: DigitalMarketingImg,
    description:
      "Turn complex ideas into clear, engaging, and professional content — including documentation, blogs, and whitepapers.",
  },
  {
    id: 11,
    category: "Digital Growth & Strategy",
    title: "SEO Optimization",
    image: DigitalMarketingImg,
    description:
      "Improve your website’s visibility on search engines with on-page SEO, keyword research, site audits, and performance tuning.",
  },
];

// Technologies Data
import ReactIcon from "../assets/images/HomeImgs/ReactIcon.svg";
import JSIcon from "../assets/images/HomeImgs/JSIcon.svg";
import DotNetIcon from "../assets/images/HomeImgs/DotNetIcon.svg";

export const technologiesHeader = {
  title: `Technologies`,
  description: `At TechSolutionsPro, we use a range of advanced technologies to manage projects from start to finish. Take a look at some of the key tools and systems we work with at TSP.`,
};

export const technologies = [
  { name: "React JS", image: ReactIcon },
  { name: "Java Script", image: JSIcon },
  { name: "Dot Net", image: DotNetIcon },
  { name: "Java Script", image: JSIcon },
  { name: "React JS", image: ReactIcon },
  { name: "React JS", image: ReactIcon },
  { name: "Java Script", image: JSIcon },
  { name: "Dot Net", image: DotNetIcon },
  { name: "Java Script", image: JSIcon },
  { name: "React JS", image: ReactIcon },
];

// Testimonials Data
import TestimonialImg01 from "../assets/images/HomeImgs/TestimonialImg01.png";

export const testimonialsHeader = {
  heading: `See what people say about NextGen360`,
  description: `Discover what our clients have to say about their experience with our services throughout the project. These testimonials offer genuine insight into our service quality and approach, helping you make a well-informed choice when selecting a software development partner.
`,
  ratingText: `Exceeding Expectations, Delivering Excellence`,
};

export const testimonials = [
  {
    id: 1,
    image: TestimonialImg01,
    name: "Elisa Grant",
    role: "Legacy Solutions Engineer",
    rating: 4.5,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    id: 2,
    image: TestimonialImg01,
    name: "Elisa Grant",
    role: "Legacy Solutions Engineer",
    rating: 5,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    id: 3,
    image: TestimonialImg01,
    name: "Elisa Grant",
    role: "Legacy Solutions Engineer",
    rating: 3.5,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    id: 4,
    image: TestimonialImg01,
    name: "Elisa Grant",
    role: "Legacy Solutions Engineer",
    rating: 4,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
];

// Awards & Certifications Data
export const awardsCertificationsHeader = {
  title: `Awards & Certifications`,
  description: `We maintain the highest standards, delivering reliable, well-crafted solutions with full transparency. Our collaborative approach ensures clients are involved at every stage of the development process.`,
};

// Location Data
export const locationHeader = {
  title: `Our Location`,
  description: `We prioritise consistent quality and clear communication at every stage, working closely with our clients throughout the process.`,
};

// Registered Data
import PSEBIcon from "../assets/images/HomeImgs/RegisteredIcons/Icon01-PSEB.svg";
import SECPIcon from "../assets/images/HomeImgs/RegisteredIcons/Icon02-SECP.svg";
import DunBradstreetIcon from "../assets/images/HomeImgs/RegisteredIcons/Icon03-DunBradstreet.svg";
import ICCIIcon from "../assets/images/HomeImgs/RegisteredIcons/Icon04-ICCI.svg";
import FBRIcon from "../assets/images/HomeImgs/RegisteredIcons/Icon05-FBR.svg";

export const registeredHeader = {
  title: `Registered With`,
  description: `Proudly registered with multiple government authorities to ensure 
                compliance, transparency, and trust.`,
};

export const topLogos = [
  { id: "1", icon: PSEBIcon, altText: "PSEB Logo" },
  { id: "2", icon: SECPIcon, altText: "SECP Logo" },
  { id: "3", icon: DunBradstreetIcon, altText: "Dun and Bradstreet Logo" },
];

export const bottomLogos = [
  { id: "1", icon: ICCIIcon, altText: "ICCI Logo" },
  { id: "2", icon: FBRIcon, altText: "FBR Logo" },
];

// Project Inquiry Form Data
export const projectInquiryForm = {
  title: `Tell us about your project`,
  step01: `Let us know your requirements, budget, and deadline, and we’ll take a look.`,
  step02: `Our expert will assess your project to understand your goals, budget, and target solutions.`,
  step03: `Once we’ve reviewed everything, we’ll get in touch to discuss the best solution.`,
};
