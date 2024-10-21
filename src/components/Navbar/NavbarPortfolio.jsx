import { Link } from "react-router-dom";

export default function NavbarPortfolio() {
  return (
    <header className="header-area">
      <div className="container-fluid h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12 h-100">
            <div className="main-menu h-100">
              <nav className="navbar h-100 navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="/src/assets/images/core-img/logo.png" alt="Logo" />
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#studioMenu"
                  aria-controls="studioMenu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fa fa-bars"></i> Menu
                </button>

                <div className="collapse navbar-collapse" id="studioMenu">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link to={"/login"}>
                          <a className="dropdown-item" href="index">
                            Home
                          </a>
                        </Link>
                        <Link to={"/login"}>
                          <a className="dropdown-item" href="index">
                            Home
                          </a>
                        </Link>{" "}
                        <Link to={"/login"}>
                          <a className="dropdown-item" href="index">
                            Home
                          </a>
                        </Link>{" "}
                        <Link to={"/login"}>
                          <a className="dropdown-item" href="index">
                            Home
                          </a>
                        </Link>
                      </div>
                    </li>

                    <Link to={"/login"}>
                      <li className="nav-item">
                        <a className="nav-link" href="portfolio.html">
                          Comuna 1
                        </a>
                      </li>
                    </Link>
                    <Link to={"/Comuna 1"}>
                      <li className="nav-item">
                        <a className="nav-link" href="portfolio.html">
                          Comuna 2
                        </a>
                      </li>
                    </Link>
                    <Link to={"/Comuna 1"}>
                      <li className="nav-item">
                        <a className="nav-link" href="portfolio.html">
                          Comuna 3
                        </a>
                      </li>
                    </Link>
                    <Link to={"/Comuna 1"}>
                      <li className="nav-item">
                        <a className="nav-link" href="portfolio.html">
                          Comuna 4
                        </a>
                      </li>
                    </Link>
                    <Link to={"/login"}>
                      <li className="nav-item">
                        <a className="nav-link" href="portfolio.html">
                          Login
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
