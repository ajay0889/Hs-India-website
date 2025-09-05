import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card p-4 shadow-sm">
              <h2 className="mb-4">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="hsindia_admin@hsindia.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Hs-India#123"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign In"}
                </button>
                <button
                  type="button"
                  className="btn btn-link ms-2"
                  onClick={() => {
                    setEmail("hsindia_admin@hsindia.com");
                    setPassword("Hs-India#123");
                  }}
                >
                  Use default superadmin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;


