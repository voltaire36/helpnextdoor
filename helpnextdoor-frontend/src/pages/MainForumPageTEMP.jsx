import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PAGINATED_HELP_REQUESTS,
  GET_PAGINATED_DISCUSSIONS,
} from "../graphql";
import TabSelector from "../components/layout/TabSelector";
import HelpRequestPlaceholder from "../components/help/HelpRequestPlaceholder";
import DiscussionPlaceholder from "../components/discussions/DiscussionPlaceholder";
import NewsPlaceholder from "../components/news/NewsPlaceholder";
import DiscussionPostDetail from "../components/discussions/DiscussionPostDetail";
import HelpRequestPostDetail from "../components/help/HelpRequestPostDetail";
import NewsPostDetail from "../components/news/NewsPostDetail";
import CreateDiscussionPost from "../components/discussions/CreateDiscussionPost";
import CreateHelpRequest from "../components/help/CreateHelpRequest";
import CreateNewsPost from "../components/news/CreateNewsPost";
import YourDiscussionsView from "../components/discussions/YourDiscussionsView";
import YourHelpRequestsView from "../components/help/YourHelpRequestsView";
import RightSideBar from "../components/layout/RightSideBar";
import Sidebar from "../components/layout/Sidebar";
import UpdateAccountDetails from "../components/layout/UpdateAccountDetails";
import ModifyYourDiscussionPost from "../components/discussions/ModifyYourDiscussionPost";
import ModifyYourHelpRequestPost from "../components/help/ModifyYourHelpRequestPost";
import AIChatBot from "../components/aiChat/AIChatBot";
import AIChatBotPage from "../components/aiChat/AIChatBotPage";
import HelpRequestCard from "../components/help/HelpRequestCard";
import DiscussionCard from "../components/discussions/DiscussionCard";
import NewsCard from "../components/news/NewsCard";

export default function MainForumPageTEMP() {
  const [activeTab, setActiveTab] = useState("help");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedHelpRequest, setSelectedHelpRequest] = useState(null);
  const [selectedDiscussionPost, setSelectedDiscussionPost] = useState(null);
  const [selectedNewsPost, setSelectedNewsPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [viewMode, setViewMode] = useState("default");
  const [showModifyPost, setShowModifyPost] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const offset = (currentPage - 1) * itemsPerPage;

  const {
    data: helpData,
    loading: helpLoading,
    error: helpError,
    refetch: refetchHelpRequests,
  } = useQuery(GET_PAGINATED_HELP_REQUESTS, {
    variables: { limit: itemsPerPage, offset },
    fetchPolicy: "network-only",
    skip: activeTab !== "help",
  });

  const {
    data: discussionData,
    loading: discussionLoading,
    error: discussionError,
    refetch: refetchDiscussionPosts,
  } = useQuery(GET_PAGINATED_DISCUSSIONS, {
    variables: { limit: itemsPerPage, offset, category: "discussion" },
    skip: activeTab !== "discussions",
    fetchPolicy: "network-only",
  });

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
    refetch: refetchNewsPosts,
  } = useQuery(GET_PAGINATED_DISCUSSIONS, {
    variables: { limit: itemsPerPage, offset, category: "news" },
    skip: activeTab !== "news",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (activeTab === "help") refetchHelpRequests();
    if (activeTab === "discussions") refetchDiscussionPosts();
    if (activeTab === "news") refetchNewsPosts();
  }, [activeTab, currentPage, itemsPerPage]);

  const filterResults = (data) => {
    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.author?.username?.toLowerCase().includes(term),
    );
  };

  const renderPlaceholders = () => {
    const filteredHelp = helpData?.getPaginatedHelpRequests
      ? filterResults(helpData.getPaginatedHelpRequests)
      : [];
    const filteredDiscussion = discussionData?.getPaginatedPosts
      ? filterResults(discussionData.getPaginatedPosts)
      : [];
    const filteredNews = newsData?.getPaginatedPosts
      ? filterResults(newsData.getPaginatedPosts)
      : [];

    if (activeTab === "help") {
      if (helpLoading)
        return Array.from({ length: itemsPerPage }).map((_, i) => (
          <HelpRequestPlaceholder key={i} />
        ));
      if (helpError)
        return (
          <div className="text-danger small">
            ⚠️ Failed to load help requests.
          </div>
        );
      return filteredHelp.length > 0 ? (
        filteredHelp.map((req) => (
          <HelpRequestCard
            key={req.id}
            request={req}
            onClick={() => {
              setSelectedHelpRequest(req);
              setShowPostDetail(true);
            }}
          />
        ))
      ) : (
        <div className="text-muted small">No help requests found.</div>
      );
    }

    if (activeTab === "discussions") {
      if (discussionLoading)
        return Array.from({ length: itemsPerPage }).map((_, i) => (
          <DiscussionPlaceholder key={i} />
        ));
      if (discussionError)
        return (
          <div className="text-danger small">
            ⚠️ Failed to load discussions.
          </div>
        );
      return filteredDiscussion.length > 0 ? (
        filteredDiscussion.map((post) => (
          <DiscussionCard
            key={post.id}
            post={post}
            onClick={() => {
              setSelectedDiscussionPost(post);
              setShowPostDetail(true);
            }}
          />
        ))
      ) : (
        <div className="text-muted small">No discussions found.</div>
      );
    }

    if (activeTab === "news") {
      if (newsLoading)
        return Array.from({ length: itemsPerPage }).map((_, i) => (
          <NewsPlaceholder key={i} />
        ));
      if (newsError)
        return <div className="text-danger small">⚠️ Failed to load news.</div>;
      return filteredNews.length > 0 ? (
        filteredNews.map((post) => (
          <NewsCard
            key={post.id}
            post={post}
            onClick={() => {
              setSelectedNewsPost(post);
              setShowPostDetail(true);
            }}
          />
        ))
      ) : (
        <div className="text-muted small">No news posts found.</div>
      );
    }

    return null;
  };

  const handlePageChange = (page) => {
    setShowPostDetail(false);
    setShowCreatePost(false);
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (showChatBot)
      return <AIChatBotPage onBack={() => setShowChatBot(false)} />;
    if (showAccountSettings)
      return (
        <UpdateAccountDetails onCancel={() => setShowAccountSettings(false)} />
      );
    if (viewMode === "yourDiscussions") {
      return showModifyPost ? (
        <ModifyYourDiscussionPost
          onCancel={() => setShowModifyPost(false)}
          selectedPost={selectedDiscussionPost}
        />
      ) : (
        <YourDiscussionsView
          onModify={() => setShowModifyPost(true)}
          setSelectedPost={setSelectedDiscussionPost}
        />
      );
    }
    if (viewMode === "yourHelpRequests") {
      return showModifyPost ? (
        <ModifyYourHelpRequestPost
          selectedRequest={selectedHelpRequest}
          onCancel={() => setShowModifyPost(false)}
        />
      ) : (
        <YourHelpRequestsView
          onModify={() => setShowModifyPost(true)}
          setSelectedRequest={setSelectedHelpRequest}
        />
      );
    }
    if (activeTab === "discussions" && showCreatePost)
      return (
        <CreateDiscussionPost
          onCancel={() => setShowCreatePost(false)}
          onCreated={refetchDiscussionPosts}
        />
      );
    if (activeTab === "help" && showCreatePost)
      return (
        <CreateHelpRequest
          onCancel={() => setShowCreatePost(false)}
          onCreated={refetchHelpRequests}
        />
      );
    if (activeTab === "news" && showCreatePost)
      return (
        <CreateNewsPost
          onCancel={() => setShowCreatePost(false)}
          onCreated={refetchNewsPosts}
        />
      );
    if (activeTab === "discussions" && showPostDetail && selectedDiscussionPost)
      return (
        <DiscussionPostDetail
          post={selectedDiscussionPost}
          onBack={() => setShowPostDetail(false)}
        />
      );
    if (activeTab === "help" && showPostDetail && selectedHelpRequest)
      return (
        <HelpRequestPostDetail
          post={selectedHelpRequest}
          onBack={() => setShowPostDetail(false)}
        />
      );
    if (activeTab === "news" && showPostDetail && selectedNewsPost)
      return (
        <NewsPostDetail
          post={selectedNewsPost}
          onBack={() => setShowPostDetail(false)}
        />
      );

    return (
      <>
        {renderPlaceholders()}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <nav>
            <ul className="pagination pagination-sm mb-0">
              {[1, 2, 3, 4, 5].map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
          <div className="d-flex align-items-center gap-2 per-page-selector">
            <label className="form-label mb-0 small">Per page:</label>
            <div className="btn-group btn-group-sm" role="group">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  className={`btn btn-outline-secondary ${itemsPerPage === count ? "active" : ""}`}
                  onClick={() => {
                    setCurrentPage(1);
                    setItemsPerPage(count);
                  }}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingBottom: "5rem" }} />
      </>
    );
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-3 col-lg-2 position-relative">
          <Sidebar
            viewMode={viewMode}
            setViewMode={setViewMode}
            setShowCreatePost={setShowCreatePost}
            setShowPostDetail={setShowPostDetail}
            setShowModifyPost={setShowModifyPost}
          />
        </div>

        <div className="col-md-6 col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="page-title m-0">
              Newest {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h4>
            {viewMode === "default" &&
              !showPostDetail &&
              !showCreatePost &&
              !showAccountSettings &&
              !showChatBot && (
                <button
                  className="create-post-btn"
                  onClick={() => setShowCreatePost(true)}
                >
                  {activeTab === "discussions"
                    ? "Create Post"
                    : activeTab === "news"
                      ? "Create News Post"
                      : "Create Request"}
                </button>
              )}
          </div>

          {viewMode === "default" &&
            !showPostDetail &&
            !showCreatePost &&
            !showAccountSettings &&
            !showChatBot && (
              <div className="mb-3">
                <TabSelector
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setShowPostDetail(false);
                    setShowCreatePost(false);
                    setCurrentPage(1);
                    setActiveTab(tab);
                  }}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            )}

          {renderContent()}
        </div>

        <div className="col-md-3 col-lg-3 position-relative">
          <div className="right-sidebar-wrapper d-flex flex-column gap-4">
            <RightSideBar setShowAccountSettings={setShowAccountSettings} />
            <AIChatBot onClick={() => setShowChatBot(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}