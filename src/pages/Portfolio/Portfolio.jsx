import NavbarPortfolio from "src/components/Navbar/NavbarPortfolio";
import "/src/assets/styles/core-style.css";
import "/src/assets/styles/responsive.css";

import bgimg1 from "/src/assets/images/bg-img/IMG_3734.JPG";
import bgimg2 from "/src/assets/images/bg-img/1.jpg";
import bgimg3 from "/src/assets/images/bg-img/2.jpg";
import bgimg4 from "/src/assets/images/bg-img/3.jpg";
import bgimg5 from "/src/assets/images/bg-img/4.jpg";
import bgimg6 from "/src/assets/images/bg-img/5.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

function Portfolio() {
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
            className="carousel-inner h-100"
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
          >
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${bgimg4})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>03.</span>
                    <h2> imagen de Comuna 5</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${bgimg1})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>01.</span>
                    <h2> imagen de Comuna 7</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${bgimg2})`,
                }}
              >
                <div className="carousel-content h-100">
                  <div className="slide-text">
                    <span>02.</span>
                    <h2> imagen de Comuna 8</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="carousel-item h-100 bg-img active"
                style={{
                  backgroundImage: `url(${bgimg3})`,
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
          </Swiper>
          <ol className="carousel-indicators">
            <li
              data-target="#welcomeSlider"
              data-slide-to="0"
              className="active bg-img"
              style={{
                backgroundImage: `url(${bgimg1})`,
              }}
            ></li>
            <li
              data-target="#welcomeSlider"
              data-slide-to="1"
              className="bg-img"
              style={{
                backgroundImage: `url(${bgimg2})`,
              }}
            ></li>
            <li
              data-target="#welcomeSlider"
              data-slide-to="2"
              className="bg-img"
              style={{
                backgroundImage: `url(${bgimg3})`,
              }}
            ></li>
            <li
              data-target="#welcomeSlider"
              data-slide-to="3"
              className="bg-img"
              style={{
                backgroundImage: `url(${bgimg4})`,
              }}
            ></li>
            <li
              data-target="#welcomeSlider"
              data-slide-to="4"
              className="bg-img"
              style={{
                backgroundImage: `url(${bgimg5})`,
              }}
            ></li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
