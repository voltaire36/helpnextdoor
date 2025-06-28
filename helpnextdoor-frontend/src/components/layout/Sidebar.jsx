import React, { useState } from "react";

export default function Sidebar({
  viewMode,
  setViewMode,
  setShowCreatePost,
  setShowPostDetail,
  setShowModifyPost,
}) {
  const [hovering, setHovering] = useState(false);

  const menuItems = [
    { key: "default", label: "Home" },
    { key: "yourDiscussions", label: "Your Discussions" },
    { key: "yourHelpRequests", label: "Your Help Requests" },
    { key: "yourHelpHighlights", label: "Your Help Highlights", static: true },
  ];

  const handleClick = (key, isStatic) => {
    if (isStatic) return;
    setViewMode(key);
    setShowCreatePost(false);
    setShowPostDetail(false);
    setShowModifyPost(false);
  };

  return (
    <div className="left-sidebar-wrapper">
      {hovering && <div className="left-sidebar-shadow"></div>}
      <div
        className="left-sidebar-custom"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar-btn ${viewMode === item.key ? "active" : ""}`}
            onClick={() => handleClick(item.key, item.static)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}