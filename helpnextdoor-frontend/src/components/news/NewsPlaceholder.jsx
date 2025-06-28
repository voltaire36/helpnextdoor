import React from "react";

export default function NewsPlaceholder() {
  return (
    <div className="post-placeholder-wrapper">
      <div className="post-placeholder-shadow"></div>
      <div className="placeholder-card">
        <div className="meta">
          <span># readers</span>
          <span>Author | Published Date</span>
        </div>
        <h5>News Headline</h5>
        <p>Short news description or snippet goes here.</p>
      </div>
    </div>
  );
}
