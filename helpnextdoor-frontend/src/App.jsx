import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import LoginPortalNavbar from "./components/layout/LoginPortalNavbar";
import MainForumWrapper from "./pages/MainForumWrapper";
import LoginPortal from "./pages/LoginPortal";
import ContainerWrapper from "./ContainerWrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Footer from "./components/layout/Footer";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="d-flex flex-column min-vh-100">
      {isLoginPage ? <LoginPortalNavbar /> : <NavBar />}

      <div className="flex-grow-1">
        {isLoginPage ? (
          <Routes>
            <Route path="/login" element={<LoginPortal />} />
          </Routes>
        ) : (
          <ContainerWrapper>
            <Routes>
              <Route path="/" element={<MainForumWrapper />} />{" "}
            </Routes>
          </ContainerWrapper>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}