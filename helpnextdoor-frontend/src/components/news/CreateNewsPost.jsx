import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { CREATE_DISCUSSION_POST } from "../../graphql/community";

export default function CreateNewsPost({ onCancel, onCreated }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost, { loading, error }] = useMutation(CREATE_DISCUSSION_POST);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both the headline and content.");
      return;
    }

    if (user.role !== "community_organizer") {
      alert("Only community organizers are allowed to post news.");
      return;
    }

    try {
      await createPost({
        variables: {
          author: user.id,
          title,
          content,
          category: "news",
        },
      });
      if (onCreated) await onCreated();
      onCancel();
    } catch (err) {
      console.error("Error creating news post:", err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Submit News Update</h4>

        <div className="mb-3">
          <label className="form-label field-label">Headline</label>
          <input
            type="text"
            className="form-control field-input"
            placeholder="Enter a news headline..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label field-label">Content</label>
          <textarea
            className="form-control field-input"
            rows="5"
            placeholder="Write a short news article or announcement..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post News"}
          </button>
        </div>

        {error && (
          <div className="text-danger small mt-2">
            Failed to create news post.
          </div>
        )}
      </div>
    </div>
  );
}