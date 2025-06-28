import React from "react";

export default function HelpRequestCard({ request, onClick }) {
  return (
    <div className="post-placeholder-wrapper" onClick={onClick}>
      <div className="post-placeholder-shadow"></div>
      <div className="placeholder-card">
        <div className="meta">
          <span>{request.volunteers.length} volunteers</span>
          <span>
            {request.author?.username} |{" "}
            {new Date(Number(request.createdAt)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h5>{request.description}</h5>
        <p>{request.location}</p>
      </div>
    </div>
  );
}
