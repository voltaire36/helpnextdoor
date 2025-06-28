import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_HELP_REQUEST, DELETE_HELP_REQUEST } from "../../graphql/help";

export default function ModifyYourHelpRequestPost({
  onCancel,
  selectedRequest,
}) {
  const [description, setDescription] = useState(selectedRequest.description);
  const [location, setLocation] = useState(selectedRequest.location);

  const [updateRequest, { loading: updating }] =
    useMutation(UPDATE_HELP_REQUEST);
  const [deleteRequest] = useMutation(DELETE_HELP_REQUEST);

  const handleSave = async () => {
    try {
      await updateRequest({
        variables: {
          id: selectedRequest.id,
          description,
          location,
        },
      });
      alert("Changes saved.");
      onCancel();
    } catch (err) {
      console.error(err);
      alert("Failed to update help request.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this help request?",
    );
    if (confirmed) {
      try {
        await deleteRequest({ variables: { id: selectedRequest.id } });
        alert("Help request deleted.");
        onCancel();
      } catch (err) {
        console.error(err);
        alert("Failed to delete help request.");
      }
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Modify Help Request</h4>

        <div className="mb-3">
          <label className="form-label field-label">Request Title</label>
          <input
            type="text"
            className="form-control field-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label field-label">Location</label>
          <input
            type="text"
            className="form-control field-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
