import React from "react";

export default function NewsCard({ post, onClick }) {
  return (
    <div className="post-placeholder-wrapper" onClick={onClick}>
      <div className="post-placeholder-shadow"></div>
      <div className="placeholder-card">
        <div className="meta">
          <span># readers</span>
          <span>
            {post.author?.username} |{" "}
            {new Date(Number(post.createdAt)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h5>{post.title}</h5>
        <p>{post.content.substring(0, 100)}...</p>
      </div>
    </div>
  );
}
