// src/components/Carousel.jsx
import {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination, Autoplay} from "swiper/modules";
import "./index.scss"; // Assuming you have a Carousel.scss for styles

export default function Carousel({numberOfSlides = 1, autoplay = false}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageModules = import.meta.glob(
      "../../assets/imagecarousel/*.{jpg,jpeg,png,svg}"
    );

    Promise.all(Object.values(imageModules).map((importFn) => importFn())).then(
      (modules) => {
        const imgs = modules.map((mod) => mod.default);
        console.log("Loaded images:", imgs); // Thêm dòng này
        setImages(imgs);
      }
    );
  }, []);

  return (
    <>
      {images.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Swiper
          slidesPerView={numberOfSlides}
          pagination={{clickable: true}}
          modules={autoplay ? [Pagination, Autoplay] : [Pagination]}
          autoplay={
            autoplay
              ? {
                  delay: 2500,
                  disableOnInteraction: false,
                }
              : false
          }
          loop={images.length >= numberOfSlides} // chỉ bật loop khi đủ slide
          className={`carousel ${numberOfSlides > 1 ? "mutiple-item" : ""}`}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={src} alt={`slide-${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
