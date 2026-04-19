import { useEffect, useRef } from "react";

const SITE_URL = "https://tech-solutionspro.com";
const BACKEND = import.meta.env.VITE_BACKEND_URL;

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

export default function BlogSEO({ blog, slug }) {
  const schemaRef = useRef(null);
  const title = `${blog.seo_title || blog.title} | NextGen360`;
  const desc = blog.seo_description || "";
  const canonical = `${SITE_URL}/blog/${slug}`;
  const img = blog.og_image ? (blog.og_image.startsWith("http") ? blog.og_image : `${BACKEND}${blog.og_image}`) : "";

  useEffect(() => {
    document.title = title;
    if (desc) setMeta("description", desc);
    if (blog.seo_keywords) setMeta("keywords", blog.seo_keywords);
    setMeta("robots", "index, follow");
    setLink("canonical", canonical);
    setMeta("og:type", "article", "property");
    setMeta("og:site_name", "NextGen360", "property");
    setMeta("og:title", blog.seo_title || blog.title, "property");
    if (desc) setMeta("og:description", desc, "property");
    setMeta("og:url", canonical, "property");
    if (img) setMeta("og:image", img, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", blog.seo_title || blog.title);
    if (desc) setMeta("twitter:description", desc);
    if (img) setMeta("twitter:image", img);

    if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; }
    if (blog.schema_json) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = blog.schema_json;
      document.head.appendChild(s);
      schemaRef.current = s;
    }
    return () => { if (schemaRef.current) { schemaRef.current.remove(); schemaRef.current = null; } };
  }, [title, desc, canonical, img, blog.seo_keywords, blog.schema_json]);

  return null;
}
