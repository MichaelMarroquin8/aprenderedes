import { Link, useRouteError } from "react-router-dom";

export const NotFount = () => {
  const error = useRouteError();
  console.log("error", error);

  return (
    <div className="error-page bg-purple">
      <div className="stars">
        <div className="central-body">
          <div className="error-404">{error?.status}</div>
          <div className="error-footer">
            <h3>{error.statusText || error.message}</h3>
            <br />
          </div>
          <Link
            to={"/"}
            href="http://salehriaz.com/404Page/404.html"
            className="btn-go-home"
          >
            VOLVER AL INICIO
          </Link>
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};
