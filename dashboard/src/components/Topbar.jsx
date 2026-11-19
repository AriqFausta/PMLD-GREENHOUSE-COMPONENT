
import { Bell, UserCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard Greenhouse",
    "/history": "History Greenhouse",
    "/threshold": "Threshold Greenhouse"
  };

  const title = pageTitles[location.pathname] || "Smart Agro";

  return (
    <header className="topbar">
      <h2>{title}</h2>

      <div className="topbar-actions">
        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-badge">5</span>
        </button>

        <div className="profile">
          <UserCircle size={27} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;