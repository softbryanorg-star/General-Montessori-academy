/**
 * Frontend admin authentication utilities
 * UI-level protection only (backend still enforces security)
 */

/**
 * Check if admin is logged in
 * Used by route guards and UI conditions
 */
export const isAdminLoggedIn = () => {
  const token = localStorage.getItem("adminToken");

  // If no token, admin is NOT logged in
  if (!token) return false;

  return true;
};

/**
 * Get stored admin data (optional helper)
 */
export const getAdminUser = () => {
  const admin = localStorage.getItem("adminUser");
  return admin ? JSON.parse(admin) : null;
};

/**
 * Logout admin safely
 */
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin/login";
};
