import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import SEO from "../../../components/SEO/SEO";
import "./News.css";

const ITEMS_PER_PAGE = 6;

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch published news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await publicApi.get("/news");
        setNews(res.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return <div className="news-loader">Loading news...</div>;
  }

  return (
    <>
      {/* SEO Injection */}
      <SEO
        title="School News & Announcements"
        description="Latest school news, announcements, and updates."
        canonicalUrl={window.location.href}
      />

      <section className="news-page">
        <header className="news-header">
          <h1>School News</h1>
          <p>Latest updates, events, and announcements</p>
        </header>

        <div className="news-grid">
          {paginatedNews.map((item) => (
            <article key={item._id} className="news-card">
              {item.coverImage && (
                <div className="news-image">
                  <img src={item.coverImage} alt={item.title} />
                </div>
              )}

              <div className="news-content">
                <h2>{item.title}</h2>
                <p className="news-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <p className="news-excerpt">
                  {item.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
                </p>

                <Link
                  to={`/news/${item.slug}`}
                  className="read-more"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default News;

//The public News page consumes only published news from the backend, applies SEO meta injection, safely previews HTML content, 
// and uses client-side pagination to avoid unnecessary backend complexity while maintaining performance 
// and responsiveness across devices.”