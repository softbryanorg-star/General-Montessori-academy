import { useEffect, useState } from "react";
import "./News.css";
import adminApi from "../../../api/adminApi";

const News = () => {
  /* ===============================
     STATE this is my state management
  =============================== */

  // All news from backend
  const [newsList, setNewsList] = useState([]);

  // Loading UX safety
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    isPublished: true,
  });

  /* ===============================
     FETCH NEWS
  =============================== */
  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get("/news");
      setNewsList(data);
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /* ===============================
     FORM CHANGE HANDLER
  =============================== */
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

  /* ===============================
     CREATE NEWS
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("isPublished", form.isPublished);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await adminApi.post("/news", formData);
      setForm({ title: "", content: "", image: null, isPublished: true });
      fetchNews();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  /* ===============================
     DELETE NEWS
  =============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news permanently?")) return;

    try {
      await adminApi.delete(`/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="admin-news">
      <h1>News Management</h1>

      {/* CREATE FORM */}
      <form className="news-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="News Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="News Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <label className="publish">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          Published
        </label>

        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Create News</button>
      </form>

      {/* NEWS LIST */}
      <div className="news-list">
        {loading ? (
          <p>Loading…</p>
        ) : (
          newsList.map((item) => (
            <div className="news-card" key={item._id}>
              <div>
                <h3>{item.title}</h3>
                <small>/{item.slug}</small>
              </div>

              <span className={item.isPublished ? "published" : "draft"}>
                {item.isPublished ? "Published" : "Draft"}
              </span>

              <button
                className="danger"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;

/* Why slug not in form

Slug is generated in pre-save hook in the backend

Why publish checkbox exists

Backend supports isPublished on creation only.
*/