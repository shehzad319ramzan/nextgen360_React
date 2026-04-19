export const stripHtml = (html) => {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const htmlProps = (html) =>
  html ? { dangerouslySetInnerHTML: { __html: html } } : {};
