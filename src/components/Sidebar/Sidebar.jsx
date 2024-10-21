import { useState } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import UserIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "src/assets/images/logo.png";
import "./Sidebar.css";

const navItems = [
  { icon: <AbcIcon />, text: "ABC" },
  { icon: <UserIcon />, text: "User" },
  { icon: <SettingsIcon />, text: "Settings" },
];

export const Sidebar = () => {
  const [active, setActive] = useState(1);
  const goto = (index) => setActive(index);

  return (
    <aside className="sidebar">
      <div className="inner">
        <div className="header">
          <img src={logo} className="logo" alt="Logo" />
          <h1>Teams.co</h1>
        </div>
        <nav className="menu">
          {navItems.map((item, index) => (
            <button
              className={active === index ? "active" : ""}
              key={index}
              onClick={() => goto(index)}
              aria-label={item.text}
            >
              <span>{item.icon}</span>
              <p>{item.text}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
