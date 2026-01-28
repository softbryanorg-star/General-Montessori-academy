import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminLoader from "./AdminLoader";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "shifted" : ""}`}>
        <AdminNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          setLoading={setLoading}
        />

        {loading && <AdminLoader />}

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


/*
“I built a reusable AdminLayout that wraps all admin pages.
The sidebar handles navigation using route-aware links.
The navbar handles global actions like theme toggling and logout.
All async states are centralized through an AdminLoader for UX consistency.
This structure prevents duplication, improves maintainability, and scales cleanly.”

*/



/* this is general breakdown of all my components in this admin 
1️⃣ Separation of Concerns

Layout logic → AdminLayout

Navigation → AdminSidebar

Actions / Controls → AdminNavbar

Async feedback → AdminLoader

Each component does one job only.
This makes debugging, refactoring, and scaling painless for future use for me or other developers.
2️⃣ Reusability & Maintainability

AdminLayout wraps all admin pages → consistent layout and behavior.

Sidebar & Navbar are modular → easy to update or swap out.  
*3️⃣ UX Consistency

AdminLoader centralizes loading states → uniform feedback across the app. 
This prevents jarring user experiences. 
4️⃣ Scalability

Clear component boundaries → new features can be added without breaking existing ones.
This architecture supports future growth seamlessly.
Overall, this component structure follows best practices for clean, maintainable, and scalable React applications.”
*/