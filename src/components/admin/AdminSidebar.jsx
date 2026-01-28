import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MailIcon from "@mui/icons-material/Mail";
import InfoIcon from "@mui/icons-material/Info";
import "./AdminSidebar.css";

const AdminSidebar = ({ isOpen }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">Admin Panel</h2>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" end>
          <DashboardIcon /> Dashboard
        </NavLink>

        <NavLink to="/admin/pages">
          <DescriptionIcon /> Pages
        </NavLink>

        <NavLink to="/admin/news">
          <ArticleIcon /> News
        </NavLink>

        <NavLink to="/admin/gallery">
          <PhotoLibraryIcon /> Gallery
        </NavLink>

        <NavLink to="/admin/messages">
          <MailIcon /> Messages
        </NavLink>

        <NavLink to="/admin/school-info">
          <InfoIcon /> School Info
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;


/*
Sidebar uses CSS transform animations (GPU-accelerated)

Layout shift uses smooth transitions

Loader overlays use visual blocking (prevents double actions)

Icons + motion = premium UX
*/
