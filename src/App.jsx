import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* =========================
   PUBLIC LAYOUT COMPONENTS
========================= */
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

/* =========================
   ADMIN LAYOUT + GUARD
========================= */
import AdminLayout from "./components/admin/AdminLayout";
import AdminRouteGuard from "./components/admin/AdminRouteGuard";

/* =========================
   PUBLIC PAGES
========================= */
import Home from "./pages/public/Home/Home";
import PageView from "./pages/public/PageView/PageView";
import PublicNews from "./pages/public/News/News";
import PublicGallery from "./pages/public/Gallery/Gallery";
import Contact from "./pages/public/Contact/Contact";

/* =========================
   ADMIN PAGES
========================= */
import AdminLogin from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Pages from "./pages/admin/Pages/Pages";
import AdminNews from "./pages/admin/News/News";
import AdminGallery from "./pages/admin/Gallery/Gallery";
import Messages from "./pages/admin/Messages/Messages";
import SchoolInfo from "./pages/admin/SchoolInfo/SchoolInfo";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/news"
          element={
            <>
              <Navbar />
              <PublicNews />
              <Footer />
            </>
          }
        />

        <Route
          path="/gallery"
          element={
            <>
              <Navbar />
              <PublicGallery />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* CMS Pages by Slug */}
        <Route
          path="/pages/:slug"
          element={
            <>
              <Navbar />
              <PageView />
              <Footer />
            </>
          }
        />

        {/* =========================
            ADMIN AUTH (PUBLIC)
        ========================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* =========================
            ADMIN PROTECTED ROUTES
        ========================= */}
        <Route element={<AdminRouteGuard />}>
          <Route element={<AdminLayout />}>

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/pages" element={<Pages />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/school-info" element={<SchoolInfo />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
