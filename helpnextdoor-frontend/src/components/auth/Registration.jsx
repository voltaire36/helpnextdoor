import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SIGNUP_USER = gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      token
    }
  }
`;

export default function Registration({ switchToLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupUser({ variables: form });
      localStorage.setItem("token", data.signup.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-card-wrapper">
      <div className="login-card-shadow"></div>

      <div className="login-card">
        <h3
          className="text-center fw-bold"
          style={{ fontFamily: "Outfit", fontWeight: 900 }}
        >
          Register
        </h3>
        <p className="text-center text-muted mb-4">
          Become a friendly neighbor!
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control field-input"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control field-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control field-input"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select
              className="form-select field-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="">Choose your role</option>
              <option value="resident">Resident</option>
              <option value="business_owner">Business Owner</option>
              <option value="community_organizer">Community Organizer</option>
            </select>
          </div>

          <button
            type="submit"
            className="submit-btn w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <div className="text-danger small mb-2 text-center">
            Registration failed. Try again.
          </div>
        )}

        <div className="text-center small mt-3">
          Already have an account?{" "}
          <button className="register-now-btn" onClick={switchToLogin}>
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}