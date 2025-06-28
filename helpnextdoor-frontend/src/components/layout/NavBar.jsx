import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleSignUpClick = () => {
    navigate("/login?view=register");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar-custom py-4">
      <div className="container px-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <Link className="navbar-brand text-decoration-none" to="/">
            helpnextdoor
          </Link>
          <button className="btn nav-btn about-highlight">About</button>
        </div>

        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <button className="btn btn-primary btn-sm" disabled>
                {user.username}
              </button>
              <button
                onClick={handleLogoutClick}
                className="btn btn-primary btn-sm"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
              <button
                onClick={handleSignUpClick}
                className="btn btn-primary btn-sm"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
