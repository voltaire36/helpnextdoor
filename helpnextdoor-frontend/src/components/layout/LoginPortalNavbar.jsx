import React from "react";
import { Link } from "react-router-dom";

export default function LoginPortalNavbar() {
  return (
    <div className="navbar-custom py-4">
      <div className="container px-4 d-flex align-items-center justify-content-start">
        <Link to="/" className="navbar-brand text-decoration-none">
          helpnextdoor
        </Link>
      </div>
    </div>
  );
}
