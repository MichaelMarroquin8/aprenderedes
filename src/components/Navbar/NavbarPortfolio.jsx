import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import logoSena from "src/assets/images/logo-sena.svg";
export default function NavbarPortfolio() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { label: "Comuna 1", path: "/" },
    { label: "Comuna 2", path: "/" },
    { label: "Comuna 3", path: "/" },
    { label: "Comuna 4", path: "/" },
    { label: "Iniciar Sesión", path: "/login" },
  ];

  return (
    <header className="header-area">
      <div className="container-fluid h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12 h-100">
            <div className="main-menu h-100">
              <nav className="navbar h-100 navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <Avatar
                    src={logoSena}
                    sx={{ width: "100px", height: "100px" }}
                  />
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
                  <IconButton color="inherit" onClick={toggleDrawer}>
                    <MenuIcon />
                  </IconButton>
                </button>

                <div className="collapse navbar-collapse" id="studioMenu">
                  <ul className="navbar-nav ml-auto">
                    {menuItems.map((item, index) => (
                      <Link key={index} to={item.path}>
                        <li className="nav-item">
                          <a className="nav-link" href={item.path}>
                            {item.label}
                          </a>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer para menú en móvil */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={toggleDrawer}
              component={Link}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </header>
  );
}
