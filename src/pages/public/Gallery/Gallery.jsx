import { useEffect, useState } from "react";
import publicApi from "../../../api/publicApi";
import SEO from "../../../components/SEO/SEO";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await publicApi.get("/gallery");
        setImages(res.data);
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <div className="gallery-loader">Loading gallery...</div>;
  }

  return (
    <>
      {/* SEO */}
      <SEO
        title="School Gallery"   //indexed by goglle ,page specific seo
        description="Explore moments, events, and memories from our school gallery."
        canonicalUrl={window.location.href}
      />

      <section className="gallery-page">
        <header className="gallery-header">
          <h1>School Gallery</h1>
          <p>Captured moments from our vibrant school life</p>
        </header>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{   //Autoplay
            delay: 3000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,  //Hoverpause
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="gallery-swiper"
        >
          {images.map((img) => (
            <SwiperSlide key={img._id}>
              <div
                className="gallery-card"
                onClick={() => setActiveImage(img)} //Clicking image sets active image and Clicking overlay clears it while stopPropagation()prevents accidental close
              >
                <img src={img.imageUrl} alt={img.title || "Gallery image"} />
                {img.title && <span className="gallery-title">{img.title}</span>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal Preview */}
        {activeImage && (
          <div className="gallery-modal" onClick={() => setActiveImage(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeImage.imageUrl} alt={activeImage.title} />
              {activeImage.title && <p>{activeImage.title}</p>}
              <button onClick={() => setActiveImage(null)}>×</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
/*
//The public gallery consumes optimized Cloudinary images from the backend, 
// presents them using a responsive Swiper carousel with autoplay 
// and hover pause, and provides a modal preview for immersive UX, 
// while maintaining SEO compliance and full mobile responsiveness.”
*/

/* This page uses:

Swiper (smooth autoplay, touch-friendly)

Modal preview

Hover pause

Keyboard + mobile safe
*/


