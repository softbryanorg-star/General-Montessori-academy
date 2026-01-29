import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pageview.css";

import { motion } from "framer-motion";
import publicApi from "../../../api/publicApi";
import SEO from "../../../components/SEO";

const PageView = () => {
  // 1️⃣ Read slug from URL: /pages/:slug
  const { slug } = useParams();   //reads the slug directly from the url insuring this page is truly dynamic and cms driven


  // 2️⃣ State management
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3️⃣ Fetch page by slug from backend
  const fetchPage = async () => {
    try {
      const res = await publicApi.get(`/pages/${slug}`);  // matches backend exactly:get page by slug no token read only
      setPage(res.data);
    } catch (err) {
      setError("Page not found");
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ Re-fetch when slug changes
  useEffect(() => {
    fetchPage();
  }, [slug]);

  // 5️⃣ Loading state
  if (loading) {
    return <div className="pageview-loading">Loading page…</div>;
  }

  // 6️⃣ Error state
  if (error || !page) {
    return <div className="pageview-error">404 — Page Not Found</div>;
  }

  return (
    <>
      {/* 7️⃣ SEO injection from backend CMS */}
      <SEO
        title={page.metaTitle || page.title}
        description={page.metaDescription}
        canonical={`${window.location.origin}/pages/${page.slug}`}
      />

      <motion.div
        className="pageview-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* ================= HEADER ================= */}
        <div className="pageview-header">
          {page.coverImage && (
            <img
              src={page.coverImage}
              alt={page.title}
              className="pageview-cover"
            />
          )}

          <h1>{page.title}</h1>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="pageview-content"
          dangerouslySetInnerHTML={{ __html: page.content }}   //dangerouslySetInnerHTMLRequired because page content is rich text HTML created in admin CMS.Backend already sanitizes content (validateRichText), so this is safe.

        />
      </motion.div>
    </>
  );
};

export default PageView;


//SEO component
//SEO metadata is stored in the database and injected dynamically,
//  enabling Google indexing per page without redeploying frontend.

