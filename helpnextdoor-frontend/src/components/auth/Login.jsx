import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login({ switchToRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginMutation({ variables: form });
      login(data.login.token); 
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
          Login
        </h3>
        <p className="text-center text-muted mb-4">Welcome back, neighbor!</p>

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="submit-btn w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="text-danger small mb-2 text-center">
            Login failed. Try again.
          </div>
        )}

        <div className="text-center small mt-3">
          Don’t have an account?{" "}
          <button className="register-now-btn" onClick={switchToRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}