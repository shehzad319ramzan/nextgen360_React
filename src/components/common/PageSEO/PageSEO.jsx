import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "NextGen360";
const SITE_URL = "https://https://nextgen360.info";
const DEFAULT_DESC = "NextGen360 is a leading IT company in Nottingham offering web development, digital marketing, SEO, PPC, and bespoke software solutions.";

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function PageSEO({ page, fallback = {} }) {
  const [seo, setSeo] = useState(null);
  const location = useLocation();
  const prevSchemaRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/seo/${page}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSeo(data); })
      .catch(() => {});
  }, [page]);

  // Auto-generate canonical from current URL path
  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const autoCanonical = currentPath === "/" ? SITE_URL : `${SITE_URL}${currentPath}`;

  const val = (field) => seo?.[field] && seo[field].trim() !== "" ? seo[field] : null;

  const title = val("title") || fallback.title || SITE_NAME;
  const description = val("description") || fallback.description || DEFAULT_DESC;
  const keywords = val("keywords") || fallback.keywords || "";
  const canonical = val("canonical") || autoCanonical;
  const robots = val("robots") || "index, follow";
  const ogTitle = val("og_title") || title;
  const ogDescription = val("og_description") || description;
  const ogImage = val("og_image") || fallback.ogImage || `${SITE_URL}/og-default.jpg`;
  const twitterCard = val("twitter_card") || "summary_large_image";
  const twitterTitle = val("twitter_title") || ogTitle;
  const twitterDescription = val("twitter_description") || ogDescription;
  const twitterImage = val("twitter_image") || ogImage;

  useEffect(() => {
    // Set title directly on the DOM
    document.title = title;

    // Basic SEO
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", robots);
    setLink("canonical", canonical);

    // Open Graph
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:title", ogTitle, "property");
    setMeta("og:description", ogDescription, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:url", canonical, "property");

    // Twitter
    setMeta("twitter:card", twitterCard);
    setMeta("twitter:title", twitterTitle);
    setMeta("twitter:description", twitterDescription);
    setMeta("twitter:image", twitterImage);

    // Schema JSON-LD
    if (prevSchemaRef.current) {
      prevSchemaRef.current.remove();
      prevSchemaRef.current = null;
    }
    if (seo?.schema_json) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = seo.schema_json;
      document.head.appendChild(script);
      prevSchemaRef.current = script;
    }

    return () => {
      if (prevSchemaRef.current) {
        prevSchemaRef.current.remove();
        prevSchemaRef.current = null;
      }
    };
  }, [title, description, keywords, robots, canonical, ogTitle, ogDescription, ogImage, twitterCard, twitterTitle, twitterDescription, twitterImage, seo?.schema_json]);

  return null;
}
