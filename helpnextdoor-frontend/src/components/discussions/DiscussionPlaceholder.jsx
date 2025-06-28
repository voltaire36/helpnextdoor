import React from "react";

export default function DiscussionPlaceholder() {
  return (
    <div className="post-placeholder-wrapper">
      <div className="post-placeholder-shadow"></div>
      <div className="placeholder-card">
        <div className="meta">
          <span># replies</span>
          <span>Author | Created Date</span>
        </div>
        <h5>Discussion Topic Title</h5>
        <p>Discussion preview or summary goes here.</p>
      </div>
    </div>
  );
}
