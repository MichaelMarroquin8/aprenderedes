import React from "react";
import NavbarPortfolio from "src/components/Navbar/NavbarPortfolio";
import "/src/assets/styles/core-style.css";
import "/src/assets/styles/responsive.css";

import Comuna5 from "/src/assets/images/bg-img/Comuna5.jpeg";
import Comuna7 from "/src/assets/images/bg-img/Comuna7.JPG";
import Comuna8 from "/src/assets/images/bg-img/Comuna8.jpeg";
import Leonera from "/src/assets/images/bg-img/Leonera.jpeg";

// Import Swiper React components
import {
  FreeMode,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Portfolio() {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  return (
    <>
      <div className="gradient-background-overlay"></div>
      <NavbarPortfolio />

      <section className="welcome-area">
        <div
          className="carousel h-100 slide"
          data-ride="carousel"
          id="welcomeSlider"
        >
          <Swiper
            className="carousel-inner h-100 mySwiper2"
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Keyboard, Pagination, Navigation, Thumbs]}
          >
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${Comuna5})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>01.</span>
                    <h2> imagen de Comuna 5</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${Comuna7})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>02.</span>
                    <h2> imagen de Comuna 7</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${Leonera})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>03.</span>
                    <h2> imagen de Comuna Leonera</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${Comuna8})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>04.</span>
                    <h2> imagen de Comuna 8</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <ol className="carousel-indicators">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <li
                  data-target="#welcomeSlider"
                  data-slide-to="0"
                  className="active bg-img"
                  style={{
                    backgroundImage: `url(${Comuna5})`,
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <li
                  data-target="#welcomeSlider"
                  data-slide-to="2"
                  className="bg-img"
                  style={{
                    backgroundImage: `url(${Comuna7})`,
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <li
                  data-target="#welcomeSlider"
                  data-slide-to="3"
                  className="bg-img"
                  style={{
                    backgroundImage: `url(${Leonera})`,
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <li
                  data-target="#welcomeSlider"
                  data-slide-to="4"
                  className="bg-img"
                  style={{
                    backgroundImage: `url(${Comuna8})`,
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </ol>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
