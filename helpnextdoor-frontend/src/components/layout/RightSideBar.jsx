import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function RightSideBar({ setShowAccountSettings }) {
  const [hovering, setHovering] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div
      className="right-sidebar-wrapper"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering && <div className="right-sidebar-shadow"></div>}

      <div className="right-sidebar-custom">
        {user ? (
          <>
            <div className="right-sidebar-title">Profile Info</div>
            <div className="right-sidebar-item">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="right-sidebar-item">
              <strong>Role:</strong> {user.role}
            </div>
            <div className="right-sidebar-item">
              <strong>User ID:</strong> {user.id}
            </div>
            <div
              className="right-sidebar-item update-account-link"
              onClick={() => setShowAccountSettings(true)}
            >
              Update Account Details
            </div>
          </>
        ) : (
          <div className="right-sidebar-welcome">
            <p className="right-sidebar-welcome-title">welcome to helpnextdoor!</p>
            <p className="right-sidebar-welcome-body">
              we connect neighbors who need help with those who want to help. 
              Join us in building a kinder, stronger community — one post at a time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}