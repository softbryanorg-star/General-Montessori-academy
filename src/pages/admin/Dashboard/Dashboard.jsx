import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Article,
  Image,
  Mail,
  School,
} from "@mui/icons-material";

import "./Dashboard.css";
import adminApi from "../../../api/adminApi";

/**
 * ADMIN DASHBOARD PAGE
 * This component is rendered INSIDE AdminLayout
 */
const Dashboard = () => {
  const [stats, setStats] = useState({      //stores dashboard numbers (pages, news, gallery, message)
    pages: 0,
    news: 0,
    gallery: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = async () => {
    try {
      const [pagesRes, newsRes, galleryRes, messagesRes] =
        await Promise.all([    // we fetch all counts in parallel not sequentially it makes the dashboard load faster
          adminApi.get("/pages"),
          adminApi.get("/news"),
          adminApi.get("/gallery"),
          adminApi.get("/messages"),
        ]);

      setStats({
        pages: pagesRes.data.length,
        news: newsRes.data.length,
        gallery: galleryRes.data.length,
        messages: messagesRes.data.length,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard…</div>;
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <motion.div   // framer motion gives smooth entrance and hover
        className="dashboard-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Admin Dashboard</h1>
        <p>Overview of your school website</p>
      </motion.div>

      {/* STATS GRID */}
      <div className="dashboard-grid">
        <DashboardCard
          title="Pages"
          value={stats.pages}
          icon={<Article />}
          color="blue"
        />

        <DashboardCard
          title="News"
          value={stats.news}
          icon={<School />}
          color="green"
        />

        <DashboardCard
          title="Gallery Images"
          value={stats.gallery}
          icon={<Image />}
          color="purple"
        />

        <DashboardCard
          title="Messages"
          value={stats.messages}
          icon={<Mail />}
          color="orange"
        />
      </div>
    </div>
  );
};

/**
 * DASHBOARD CARD COMPONENT
 */
const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className={`dashboard-card ${color}`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </motion.div>
  );
};

export default Dashboard;



/* The dashboard is a presentation only layer that consumes authenticated admin only api runs inside a shared admin layout
respects the centralizeds theme context and uses parallel api fetching for perfomance


SECURITY
1 uses admin Api
2 Token is injected via axios interceptors
3 no maual auth logic needed here
“I built a clean and responsive Admin Dashboard that summarizes key metrics like pages, news, gallery images, and messages.
It fetches data from secured admin APIs in parallel for performance.
Each metric is displayed in an interactive card with smooth animations using Framer Motion.
The layout is fully responsive, ensuring usability across devices.
This dashboard provides admins with a quick overview of site activity and content at a glance.” 
*/