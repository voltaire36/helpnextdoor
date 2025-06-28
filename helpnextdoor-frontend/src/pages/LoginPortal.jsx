import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";

export default function LoginPortal() {
  const [view, setView] = useState("login");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "register") {
      setView("register");
    }
  }, [location.search]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bs-body-bg)" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {view === "login" ? (
            <Login switchToRegister={() => setView("register")} />
          ) : (
            <Registration switchToLogin={() => setView("login")} />
          )}
        </div>
      </div>
    </div>
  );
}