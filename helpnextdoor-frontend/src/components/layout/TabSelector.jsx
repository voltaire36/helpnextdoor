
import React from "react";

export default function TabSelector({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) {
  const tabs = [
    { key: "discussions", label: "Discussions" },
    { key: "help", label: "Help Requests" },
    { key: "news", label: "News" },
  ];

  return (
    <div className="tab-selector-container d-flex justify-content-between align-items-center">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => {
              setSearchTerm("");
              setActiveTab(tab.key);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-search-container">
        <input
          type="text"
          className="form-control tab-search-input"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
