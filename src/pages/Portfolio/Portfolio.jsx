import NavbarPortfolio from "src/components/Navbar/NavbarPortfolio";
import "/src/assets/styles/core-style.css";
import "/src/assets/styles/responsive.css";

import bgimg1 from "/src/assets/images/bg-img/IMG_3734.JPG";
import bgimg2 from "/src/assets/images/bg-img/1.jpg";
import bgimg3 from "/src/assets/images/bg-img/2.jpg";
import bgimg4 from "/src/assets/images/bg-img/3.jpg";
import bgimg5 from "/src/assets/images/bg-img/4.jpg";
import bgimg6 from "/src/assets/images/bg-img/5.jpg";

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
          <div className="carousel-inner h-100">
            <div
              className="carousel-item h-100 bg-img active"
              style={{
                backgroundImage: `url(${bgimg1})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>01.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>

            <div
              className="carousel-item h-100 bg-img"
              style={{
                backgroundImage: `url(${bgimg2})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>02.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>
            <div
              className="carousel-item h-100 bg-img"
              style={{
                backgroundImage: `url(${bgimg3})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>03.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>
            <div
              className="carousel-item h-100 bg-img"
              style={{
                backgroundImage: `url(${bgimg4})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>04.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>
            <div
              className="carousel-item h-100 bg-img"
              style={{
                backgroundImage: `url(${bgimg5})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>05.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>
            <div
              className="carousel-item h-100 bg-img"
              style={{
                backgroundImage: `url(${bgimg6})`,
              }}
            >
              <div className="carousel-content h-100">
                <div className="slide-text">
                  <span>06.</span>
                  <h2> imagen de Comuna #</h2>
                </div>
              </div>
            </div>
          </div>
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
      <div className="contact-popup-form" id="contact-modal-lg">
        <div
          className="modal fade contact-modal-lg"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="contact-modal-lg"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="contact-heading-text text-center mb-30">
                      <span></span>
                      <h2>Please get in touch</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form-area">
                <div className="container-fluid">
                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols={30}
                          rows={10}
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div className="col-12 text-center">
                        <button type="submit" className="btn studio-btn mt-3">
                          <img
                            src="/src/assets/images/core-img/logo-icon.png"
                            alt=""
                          />{" "}
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
