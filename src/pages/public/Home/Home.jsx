import { useEffect, useState } from "react";
import "./Home.css";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Slider from "react-slick";

import "swiper/css";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import publicApi from "../../../api/publicApi";
import SEO from "../../../components/SEO";

const Home = () => {
  // 1️⃣ State for backend data
  const [school, setSchool] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2️⃣ Fetch all data needed for Home
  const fetchHomeData = async () => {
    try {
      const [schoolRes, galleryRes, newsRes] = await Promise.all([
        publicApi.get("/school-info"),
        publicApi.get("/gallery"),
        publicApi.get("/news"),
      ]);

      setSchool(schoolRes.data);
      setGallery(galleryRes.data || []);
      setNews(newsRes.data || []);
    } catch (error) {
      console.error("Home page data load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) return <div className="home-loading">Loading…</div>;

  // 3️⃣ Slick settings for gallery preview
  const gallerySettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  // react-slick may be imported as a module object depending on bundler interop.
  // Support both `Slider` and `Slider.default` shapes.
  const SlickSlider = Slider && (Slider.default ? Slider.default : Slider);

  return (
    <>
      {/* 4️⃣ SEO Injection from backend */}
      <SEO
        title={school?.metaTitle || school?.schoolName}
        description={school?.metaDescription}
        keywords={school?.metaKeywords}
        canonical={school?.canonicalUrl}
        ogImage={school?.ogImage}
      />

      <div className="home-container">
        {/* ================= HERO SECTION ================= */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="home-hero-swiper"
        >
          <SwiperSlide>
            <motion.div
              className="hero-slide"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>{school?.schoolName}</h1>
              <p>{school?.about}</p>
            </motion.div>
          </SwiperSlide>

          <SwiperSlide>
            <motion.div
              className="hero-slide"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>Excellence in Education</h1>
              <p>Building future leaders through knowledge and discipline</p>
            </motion.div>
          </SwiperSlide>
        </Swiper>

        {/* ================= GALLERY PREVIEW ================= */}
        <section className="home-section">
          <h2>Our School in Pictures</h2>

          {SlickSlider ? (
            <SlickSlider {...gallerySettings}>
              {gallery.map((img) => (
                <div key={img._id} className="gallery-card">
                  <img src={img.imageUrl} alt={img.title || "School gallery"} />
                </div>
              ))}
            </SlickSlider>
          ) : (
            <div className="gallery-fallback">
              {gallery.map((img) => (
                <div key={img._id} className="gallery-card">
                  <img src={img.imageUrl} alt={img.title || "School gallery"} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= NEWS PREVIEW ================= */}
        <section className="home-section">
          <h2>Latest News</h2>

          <div className="news-preview">
            {news.slice(0, 3).map((item) => (
              <motion.div
                key={item._id}
                className="news-card"
                whileHover={{ scale: 1.03 }}
              >
                {item.coverImage && (
                  <img src={item.coverImage} alt={item.title} />
                )}
                <h3>{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

//  i used Swiper for Hero?” because
// Swiper handles autoplay, pagination, and 
// touch gestures better than Slick for hero sections.

//“While i used Slick for Gallery?” because
//Slick provides precise multi-slide control and
//  smooth infinite scrolling ideal for image previews.
