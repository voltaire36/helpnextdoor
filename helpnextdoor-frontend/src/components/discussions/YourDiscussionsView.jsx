import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import {
  GET_DISCUSSION_BY_ID,
  GET_PAGINATED_DISCUSSIONS,
} from "../../graphql/community";

export default function YourDiscussionsView({ onModify, setSelectedPost }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const { data, loading, error, refetch } = useQuery(
    GET_PAGINATED_DISCUSSIONS,
    {
      variables: {
        limit: 100,
        offset: 0,
        category: "discussion",
      },
      fetchPolicy: "network-only",
    },
  );

  useEffect(() => {
    if (data?.getPaginatedPosts) {
      const userPosts = data.getPaginatedPosts.filter(
        (post) => post.author?.username === user?.username,
      );
      setPosts(userPosts);
    }
  }, [data, user]);

  if (loading)
    return <div className="text-muted small">Loading your discussions...</div>;
  if (error)
    return <div className="text-danger small">Failed to load discussions.</div>;

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-muted small">
          You haven’t posted any discussions yet.
        </p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-placeholder-wrapper">
            <div className="post-placeholder-shadow"></div>
            <div className="placeholder-card">
              <div className="meta">
                <span>
                  {post.author?.username} |{" "}
                  {new Date(Number(post.createdAt)).toLocaleDateString()}
                </span>
              </div>
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn comment-btn"
                  onClick={() => {
                    setSelectedPost(post);
                    onModify();
                  }}
                >
                  Modify
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}