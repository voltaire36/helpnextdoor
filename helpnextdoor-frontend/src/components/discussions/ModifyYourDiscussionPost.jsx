import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  UPDATE_DISCUSSION_POST,
  DELETE_DISCUSSION_POST,
} from "../../graphql/community";

export default function ModifyYourDiscussionPost({ onCancel, selectedPost }) {
  const [content, setContent] = useState(selectedPost.content || "");
  const [aiSummary, setAiSummary] = useState(selectedPost.aiSummary || "");

  const [updatePost, { loading: updating }] = useMutation(
    UPDATE_DISCUSSION_POST,
  );
  const [deletePost] = useMutation(DELETE_DISCUSSION_POST);

  const handleSave = async () => {
    try {
      await updatePost({
        variables: {
          id: selectedPost.id,
          content,
          aiSummary,
        },
      });
      alert("Changes saved.");
      onCancel();
    } catch (err) {
      console.error(err);
      alert("Failed to update post.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this discussion?",
    );
    if (!confirmed) return;

    try {
      await deletePost({ variables: { id: selectedPost.id } });
      alert("Post deleted.");
      onCancel();
    } catch (err) {
      console.error("Failed to delete post:", err.message);
      alert("Could not delete post.");
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Modify Discussion Post</h4>

        <div className="mb-3">
          <label className="form-label field-label">Discussion Content</label>
          <textarea
            className="form-control field-input"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label field-label">Optional AI Summary</label>
          <input
            type="text"
            className="form-control field-input"
            value={aiSummary}
            onChange={(e) => setAiSummary(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn modify-action-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn modify-action-btn" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="btn modify-action-btn"
            onClick={handleSave}
            disabled={updating}
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
