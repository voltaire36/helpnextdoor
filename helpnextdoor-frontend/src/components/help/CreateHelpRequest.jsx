import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { CREATE_HELP_REQUEST } from "../../graphql/help";

export default function CreateHelpRequest({ onCancel, onCreated }) {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [createHelpRequest, { loading, error }] =
    useMutation(CREATE_HELP_REQUEST);

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Please enter your help request description.");
      return;
    }

    try {
      await createHelpRequest({
        variables: {
          author: user.id,
          description,
          location,
        },
      });
      if (onCreated) await onCreated(); // ✅ Refresh list
      onCancel(); // ✅ Close form
    } catch (err) {
      console.error("Error creating help request:", err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Create Help Request</h4>

        <div className="mb-3">
          <label className="form-label field-label">Request Title</label>
          <input
            type="text"
            className="form-control field-input"
            placeholder="What's your request about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label field-label">Location</label>
          <input
            type="text"
            className="form-control field-input"
            placeholder="Where do you need help?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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
            {loading ? "Posting..." : "Post Request"}
          </button>
        </div>

        {error && (
          <div className="text-danger small mt-2">
            Failed to create help request.
          </div>
        )}
      </div>
    </div>
  );
}
