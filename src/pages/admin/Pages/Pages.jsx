import { useEffect, useState } from "react";
import "./Pages.css";
import adminApi from "../../../api/adminApi";

/**
 * Admin Pages CMS
 * - Create
 * - Read
 * - Update
 * - Delete
 * - SEO support
 */
const Pages = () => {
  // =========================
  // STATE
  // =========================
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: true,
    image: null,
  });

  // =========================
  // FETCH ALL PAGES
  // =========================
  const fetchPages = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get("/pages");
      setPages(data);
    } catch (err) {
      console.error("Failed to fetch pages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // =========================
  // FORM HANDLERS
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  // =========================
  // SUBMIT (CREATE / UPDATE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();     //Required because backend uses upload.single("image")  JSON would break file upload
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      if (editingPage) {
        await adminApi.put(`/pages/${editingPage._id}`, formData);
      } else {
        await adminApi.post("/pages", formData);
      }

      resetForm();
      fetchPages();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (page) => {
    setEditingPage(page);
    setForm({
      title: page.title,
      content: page.content,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      isPublished: page.isPublished,
      image: null,
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this page permanently?")) return;

    try {
      await adminApi.delete(`/pages/${id}`);
      fetchPages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setEditingPage(null);
    setForm({
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      isPublished: true,
      image: null,
    });
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="pages-admin">
      <h1>Pages CMS</h1>

      {/* ===== FORM ===== */}
      <form className="page-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Page Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Page Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <input
          name="metaTitle"
          placeholder="SEO Meta Title"
          value={form.metaTitle}
          onChange={handleChange}
        />

        <textarea
          name="metaDescription"
          placeholder="SEO Meta Description"
          value={form.metaDescription}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          Published
        </label>

        <input type="file" name="image" onChange={handleChange} />

        <div className="form-actions">
          <button type="submit">
            {editingPage ? "Update Page" : "Create Page"}
          </button>

          {editingPage && (
            <button type="button" onClick={resetForm} className="cancel">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ===== LIST ===== */}
      <div className="page-list">
        {loading ? (
          <p>Loading pages…</p>
        ) : (
          pages.map((page) => (
            <div key={page._id} className="page-card">
              <div>
                <h3>{page.title}</h3>
                <small>/{page.slug}</small>
              </div>

              <div className="actions">
                <button onClick={() => handleEdit(page)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => handleDelete(page._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pages;
