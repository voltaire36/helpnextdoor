import React from "react";

export default function HelpRequestPlaceholder() {
  return (
    <div className="post-placeholder-wrapper">
      <div className="post-placeholder-shadow"></div>
      <div className="placeholder-card">
        <div className="meta">
          <span># volunteers</span>
          <span>Author | Created Date</span>
        </div>
        <h5>Help Request Title</h5>
        <p>Help Request Description</p>
      </div>
    </div>
  );
}
