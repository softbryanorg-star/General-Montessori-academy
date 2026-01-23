import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../../../theme/ThemeContext";
import { logout } from "../../../utils/auth";
import "./AdminNavbar.css";

const AdminNavbar = ({ toggleSidebar, setLoading }) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      window.location.href = "/admin/login";
    }, 800);
  };

  return (
    <header className="admin-navbar">
      <button className="icon-btn" onClick={toggleSidebar}>
        <MenuIcon />
      </button>

      <div className="admin-actions">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <button className="icon-btn logout" onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;


/*
Navbar controls layout, theme, auth

Theme toggle connects to global context

Logout clears token (auth.js)

Loading state improves perceived performance



Navbar controls theme globally

Admin components automatically inherit theme variables

No duplicated logic

No prop drilling


 Logout is centralized

Token is cleared properly

Admin pages are layout-protected

Redirection is explicit (no magic)
*/



