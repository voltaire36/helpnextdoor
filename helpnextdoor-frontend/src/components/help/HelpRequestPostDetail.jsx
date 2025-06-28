import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { GET_COMMENTS_BY_POST, ADD_COMMENT } from "../../graphql/comments";
import CommentSection from "../layout/CommentSection";

export default function HelpRequestPostDetail({ post, onBack }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const { data, loading, error, refetch } = useQuery(GET_COMMENTS_BY_POST, {
    variables: { postId: post.id },
    skip: !post?.id,
  });

  const [addComment] = useMutation(ADD_COMMENT);

  useEffect(() => {
    if (data?.getCommentsByPost) {
      setComments(data.getCommentsByPost);
    }
  }, [data]);

  const handleAddComment = async (newContent) => {
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      await addComment({
        variables: {
          post: post.id,
          author: user.id,
          content: newContent,
        },
      });
      refetch(); // Refresh comment list after successful submission
    } catch (err) {
      console.error("Failed to add comment:", err.message);
      alert("Failed to add comment. Please try again later.");
    }
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div className="post-detail-card">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="post-detail-title outfit-title">
              {post.description || "Untitled Request"}
            </h4>
            <div className="text-muted small">
              {post.author?.username || "Unknown"} &nbsp; | &nbsp;
              {new Date(Number(post.createdAt)).toLocaleDateString("en-US")}
            </div>
          </div>
          <div className="text-end">
            <div className="volunteer-count">
              {post.volunteers.length} volunteers
            </div>
            <button
              className="btn btn-link btn-sm p-0 back-link"
              onClick={onBack}
            >
              ← Back to Help Requests
            </button>
          </div>
        </div>

        <p className="post-detail-content">
          {post.location && <strong>Location: </strong>}
          {post.location || "No location specified."}
        </p>

        <div className="mb-3">
          <button className="btn btn-primary btn-sm">Volunteer!</button>
        </div>

        <CommentSection
          placeholder="Add a comment"
          comments={comments}
          onSubmit={handleAddComment}
        />

        {loading && <div className="text-muted small">Loading comments...</div>}
        {error && (
          <div className="text-danger small">Failed to load comments.</div>
        )}
      </div>
    </div>
  );
}
