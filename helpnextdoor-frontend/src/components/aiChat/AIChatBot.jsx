import React, { useState } from "react";

export default function AIChatBot({ onClick }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="right-sidebar-wrapper"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering && <div className="right-sidebar-shadow"></div>}
      <div className="right-sidebar-custom">
        <div className="right-sidebar-welcome">
          <p className="right-sidebar-welcome-title">Community Chat Bot</p>
          <p className="right-sidebar-welcome-body">
            Ask questions, get assistance, or explore helpful resources.
          </p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary btn-sm" onClick={onClick}>
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}