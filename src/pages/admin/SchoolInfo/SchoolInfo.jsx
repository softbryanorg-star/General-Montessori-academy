  import { useEffect, useState } from "react";
import "./SchoolInfo.css";
import adminApi from "../../../api/adminApi";
import { motion } from "framer-motion";

const SchoolInfo = () => {
  const [form, setForm] = useState({
    schoolName: "",
    address: "",
    phone: "",
    email: "",
    about: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    ogImage: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1️⃣ Fetch existing SchoolInfo (there is only ONE)
  const fetchSchoolInfo = async () => {
    try {
      const { data } = await adminApi.get("/school-info");

      if (data) {
        setForm({
          schoolName: data.schoolName || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          about: data.about || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          metaKeywords: data.metaKeywords?.join(", ") || "",
          canonicalUrl: data.canonicalUrl || "",
          ogImage: data.ogImage || "",
        });

        setLogoPreview(data.logo || "");
      }
    } catch (error) {
      console.error("Failed to load school info", error);
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Handle text input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3️⃣ Handle logo selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // 4️⃣ Submit form (POST or PUT handled by backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "metaKeywords") {
        formData.append(
          key,
          value.split(",").map((k) => k.trim())
        );
      } else {
        formData.append(key, value);
      }
    });

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      await adminApi.post("/school-info", formData);
      alert("School information updated successfully");
    } catch (error) {
      console.error("Failed to save school info", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  if (loading) return <div className="schoolinfo-loading">Loading…</div>;

  return (
    <motion.form
      className="schoolinfo-container"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>School Information</h1>

      {/* Identity */}
      <section>
        <h2>Identity</h2>

        <input
          name="schoolName"
          placeholder="School Name"
          value={form.schoolName}
          onChange={handleChange}
          required
        />

        <textarea
          name="about"
          placeholder="About the school"
          value={form.about}
          onChange={handleChange}
        />

        <div className="logo-upload">
          {logoPreview && <img src={logoPreview} alt="Logo Preview" />}
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2>Contact</h2>

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
      </section>

      {/* SEO */}
      <section>
        <h2>SEO</h2>

        <input
          name="metaTitle"
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={handleChange}
        />

        <textarea
          name="metaDescription"
          placeholder="Meta Description"
          value={form.metaDescription}
          onChange={handleChange}
        />

        <input
          name="metaKeywords"
          placeholder="Keywords (comma separated)"
          value={form.metaKeywords}
          onChange={handleChange}
        />

        <input
          name="canonicalUrl"
          placeholder="Canonical URL"
          value={form.canonicalUrl}
          onChange={handleChange}
        />

        <input
          name="ogImage"
          placeholder="Open Graph Image URL"
          value={form.ogImage}
          onChange={handleChange}
        />
      </section>

      <button disabled={saving}>
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </motion.form>
  );
};

export default SchoolInfo;
