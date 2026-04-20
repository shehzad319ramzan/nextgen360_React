import { useEffect } from "react";
import { stripHtml } from "@/utils/html";

const SITE_URL = "https://https://nextgen360.info";

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

export default function PortfolioSEO({ item, slug, coverUrl }) {
  const title = `${item.title} | Portfolio | NextGen360`;
  const canonical = `${SITE_URL}/portfolio/${slug}`;

  const plainDesc = stripHtml(item.description);

  useEffect(() => {
    document.title = title;
    if (plainDesc) setMeta("description", plainDesc);
    setMeta("robots", "index, follow");
    setLink("canonical", canonical);
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "NextGen360", "property");
    setMeta("og:title", title, "property");
    if (plainDesc) setMeta("og:description", plainDesc, "property");
    setMeta("og:url", canonical, "property");
    if (coverUrl) setMeta("og:image", coverUrl, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    if (plainDesc) setMeta("twitter:description", plainDesc);
    if (coverUrl) setMeta("twitter:image", coverUrl);
  }, [title, canonical, plainDesc, coverUrl]);

  return null;
}
