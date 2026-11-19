
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  SlidersHorizontal,
  LogOut,
  Sprout,
  PanelLeftClose
} from "lucide-react";

import { logoutUser } from "../services/auth";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dan informasi pengguna
    logoutUser();

    // Kembali ke halaman Login
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboards",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "History",
      path: "/history",
      icon: History
    },
    {
      name: "Threshold",
      path: "/threshold",
      icon: SlidersHorizontal
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Sprout size={22} />
        </div>

        <span>Smart Agro</span>

        <PanelLeftClose size={18} className="collapse-icon" />
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <Icon size={17} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;