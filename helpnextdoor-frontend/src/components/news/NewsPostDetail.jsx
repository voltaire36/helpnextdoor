import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { GET_COMMENTS_BY_POST, ADD_COMMENT } from "../../graphql/comments";
import CommentSection from "../layout/CommentSection";

export default function NewsPostDetail({ post, onBack }) {
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
      refetch();
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
              {post.title || "News Headline"}
            </h4>
            <div className="text-muted small">
              {post.author?.username || "Reporter"} &nbsp; | &nbsp;
              {new Date(Number(post.createdAt)).toLocaleDateString("en-US")}
            </div>
          </div>
          <div className="text-end">
            <button
              className="btn btn-link btn-sm p-0 back-link"
              onClick={onBack}
            >
              ← Back to News
            </button>
          </div>
        </div>

        <p className="post-detail-content">{post.content}</p>

        <CommentSection
          placeholder="Add a comment or reaction"
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