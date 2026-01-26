import api from "./axios";

/* =========================
   PUBLIC CMS
========================= */

export const getPageBySlug = (slug) => {
  return api.get(`/pages/${slug}`);
};

/* =========================
   PUBLIC NEWS
========================= */

export const getPublishedNews = () => {
  return api.get("/news");
};

/* =========================
   SCHOOL INFO
========================= */

export const getSchoolInfo = () => {
  return api.get("/school-info");
};

/* =========================
   GALLERY
========================= */

export const getGallery = () => {
  return api.get("/gallery");
};

/* =========================
   CONTACT
========================= */

export const sendContactMessage = (data) => {
  return api.post("/contact", data);
};

// Default export: expose the axios instance for code that imports the module as `publicApi`
export default api;

