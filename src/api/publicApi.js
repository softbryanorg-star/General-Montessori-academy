import api from "./axios";

/* =========================
   AUTH
========================= */

export const adminLogin = (data) => {
  return api.post("/admin/login", data);
};

export const requestPasswordReset = (email) => {
  return api.post("/admin/forgot-password", { email });
};

export const resetPassword = (payload) => {
  return api.post("/admin/reset-password", payload);
};

export const changePassword = (payload) => {
  return api.put("/admin/change-password", payload);
};

export const addAdmin = (payload) => {
  return api.post("/admin/add", payload);
};

/* =========================
   PAGES (CMS)
========================= */

export const createPage = (data) => {
  return api.post("/admin/pages", data);
};

export const updatePage = (id, data) => {
  return api.put(`/admin/pages/${id}`, data);
};

export const deletePage = (id) => {
  return api.delete(`/admin/pages/${id}`);
};

export const getPage = (slug) => {
  return api.get(`/admin/pages/${slug}`);
};

/* =========================
   NEWS
========================= */

export const createNews = (data) => {
  return api.post("/admin/news", data);
};

export const getAllNews = () => {
  return api.get("/admin/news");
};

export const deleteNews = (id) => {
  return api.delete(`/admin/news/${id}`);
};

/* =========================
   GALLERY
========================= */

export const uploadGalleryImage = (formData) => {
  return api.post("/admin/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteGalleryImage = (id) => {
  return api.delete(`/admin/gallery/${id}`);
};

export const getAdminGallery = () => {
  return api.get("/admin/gallery");
};

/* =========================
   SCHOOL INFO
========================= */

export const getSchoolInfoAdmin = () => {
  return api.get("/admin/school-info");
};

export const updateSchoolInfo = (data) => {
  return api.put("/admin/school-info", data);
};

/* =========================
   CONTACT MESSAGES
========================= */

export const getAllMessages = () => {
  return api.get("/admin/messages");
};

export const deleteMessage = (id) => {
  return api.delete(`/admin/messages/${id}`);
};

/*
Why this separation matters

Public pages never touch admin routes

No accidental token usage

Clean security boundary

Scales perfectly if you add mobile app later 
*/