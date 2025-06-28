import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { CREATE_DISCUSSION_POST } from "../../graphql/community";

export default function CreateDiscussionPost({ onCancel, onCreated }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost, { loading, error }] = useMutation(CREATE_DISCUSSION_POST);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both the title and description.");
      return;
    }

    try {
      await createPost({
        variables: {
          author: user.id,
          title,
          content,
          category: "discussion",
        },
      });
      if (onCreated) await onCreated();
      onCancel();
    } catch (err) {
      console.error("Error creating discussion post:", err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Create New Discussion</h4>

        <div className="mb-3">
          <label className="form-label field-label">Discussion Title</label>
          <input
            type="text"
            className="form-control field-input"
            placeholder="Enter your discussion topic..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label field-label">Description</label>
          <textarea
            className="form-control field-input"
            rows="5"
            placeholder="Describe your topic, questions, or thoughts here..."
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
            {loading ? "Posting..." : "Post Discussion"}
          </button>
        </div>

        {error && (
          <div className="text-danger small mt-2">
            Failed to create discussion post.
          </div>
        )}
      </div>
    </div>
  );
}
