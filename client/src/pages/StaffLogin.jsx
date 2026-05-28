import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import NavBar from "../components/NavBar";

import "../styles/pages/StaffLogin.css";

function StaffLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/staff-dashboard");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar cartCount={0} />

      <main className="staff-login container">
        <section className="staff-login__card">
          <h1 className="staff-login__title">Staff Login</h1>

          <p className="staff-login__subtitle">
            Enter your credentials to access the staff dashboard.
          </p>

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <label className="staff-login__label" htmlFor="staff-email">
            Email
          </label>

          <input
            id="staff-email"
            type="email"
            className="staff-login__input"
            placeholder="name@rollingcones.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="staff-login__label" htmlFor="staff-password">
            Password
          </label>

          <input
            id="staff-password"
            type="password"
            className="staff-login__input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="staff-login__button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </section>
      </main>
    </>
  );
}

export default StaffLogin;
