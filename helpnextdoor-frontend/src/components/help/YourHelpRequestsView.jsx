import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { GET_HELP_REQUESTS_BY_USER } from "../../graphql/help";

export default function YourHelpRequestsView({ onModify, setSelectedRequest }) {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const { data, loading, error, refetch } = useQuery(
    GET_HELP_REQUESTS_BY_USER,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
      fetchPolicy: "network-only",
    },
  );

  useEffect(() => {
    if (data?.getHelpRequestsByUser) {
      setRequests(data.getHelpRequestsByUser);
    }
  }, [data]);

  if (loading)
    return (
      <div className="text-muted small">Loading your help requests...</div>
    );
  if (error)
    return (
      <div className="text-danger small">Failed to load help requests.</div>
    );

  return (
    <div>
      {requests.length === 0 ? (
        <p className="text-muted small">
          You haven’t posted any help requests yet.
        </p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="post-placeholder-wrapper">
            <div className="post-placeholder-shadow"></div>
            <div className="placeholder-card">
              <div className="meta">
                <span>{req.volunteers.length} volunteers</span>
                <span>
                  {user.username} |{" "}
                  {new Date(Number(req.createdAt)).toLocaleDateString()}
                </span>
              </div>
              <h5>{req.description}</h5>
              <p>{req.location}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn comment-btn"
                  onClick={() => {
                    setSelectedRequest(req);
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
