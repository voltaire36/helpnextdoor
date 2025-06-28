import React from "react";

export default function UpdateAccountDetails({ onCancel }) {
  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <h4 className="create-post-title">Update Account Details</h4>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label field-label">Username</label>
          <input
            type="text"
            className="form-control field-input"
            placeholder="Update your username..."
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label field-label">Password</label>
          <input
            type="password"
            className="form-control field-input"
            placeholder="Update your password..."
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label field-label">Email Address</label>
          <input
            type="email"
            className="form-control field-input"
            placeholder="Update your email..."
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="form-label field-label">Role</label>
          <select className="form-select field-input">
            <option value="">Choose your role</option>
            <option value="resident">Resident</option>
            <option value="business_owner">Business Owner</option>
            <option value="community_organizer">Community Organizer</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn submit-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
