import { useEffect, useState } from "react";
import "./Gallery.css";
import adminApi from "../../../api/adminApi";

const Gallery = () => {
  /* ===============================
     STATE
  =============================== */

  // Gallery images from backend
  const [images, setImages] = useState([]);

  // Upload form
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  /* ===============================
     FETCH GALLERY
  =============================== */
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get("/gallery");
      setImages(data);
    } catch (err) {
      console.error("Gallery fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* ===============================
     UPLOAD IMAGE
  =============================== */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();   // i used Multipart/form-data for file upload because json format would break uploads
    formData.append("image", file);   // MUST match upload.single("image")
    formData.append("title", title);

    try {
      await adminApi.post("/gallery", formData);
      setTitle("");
      setFile(null);
      fetchGallery();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  /* ===============================
     DELETE IMAGE
  =============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image permanently?")) return;

    try {
      await adminApi.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="admin-gallery">
      <h1>Gallery Manager</h1>

      {/* UPLOAD FORM */}
      <form className="upload-form" onSubmit={handleUpload}>
        <input
          placeholder="Image title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Upload Image</button>
      </form>

      {/* GALLERY GRID */}
      <div className="gallery-grid">
        {loading ? (
          <p>Loading…</p>
        ) : (
          images.map((img) => (
            <div className="gallery-card" key={img._id}>
              <img //cloudnary optimization only happens on the backend frontend only consumes this
                src={img.imageUrl}   // cloudnary already compresses, optimizes and serves it via CDN
                alt={img.title || "Gallery image"}
                onClick={() => setPreview(img.imageUrl)}
              />

              <div className="overlay">
                <span>{img.title || "Untitled"}</span>
                <button onClick={() => handleDelete(img._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div className="preview-modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
