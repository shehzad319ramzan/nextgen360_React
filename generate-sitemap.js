import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { fileURLToPath } from "url";
import { servicesData, solutionsData } from "./src/data/sitemap-data/data.js"; // Adjust path

// Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "https://nextgen360.net"; // Replace with your actual domain

const staticRoutes = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/digital-marketing", changefreq: "monthly", priority: 0.8 },
  { url: "/careers", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/aboutus", changefreq: "monthly", priority: 0.8 },
];

function toKebab(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const serviceRoutes = servicesData.flatMap((category) => {
  const categorySlug = toKebab(category.title);
  return category.items.map((item) => ({
    url: `/services/${categorySlug}/${toKebab(item)}`,
    changefreq: "monthly",
    priority: 0.7,
  }));
});

const solutionRoutes = solutionsData.options.map((solution) => ({
  url: `/solutions/${toKebab(solution)}`,
  changefreq: "monthly",
  priority: 0.7,
}));

const allRoutes = [...staticRoutes, ...serviceRoutes, ...solutionRoutes];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname });
  const outputPath = path.resolve(__dirname, "public", "sitemap.xml");
  const writeStream = fs.createWriteStream(outputPath);

  sitemap.pipe(writeStream);
  allRoutes.forEach((route) => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log("✅ Sitemap generated at /public/sitemap.xml");
}

generateSitemap().catch(console.error);
