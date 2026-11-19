
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.message || "Login gagal. Periksa email dan password."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <Sprout size={36} />
        </div>

        <h2>Masuk ke Smart Agro</h2>
        <p className="login-subtitle">
          Silakan masuk untuk melanjutkan.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                setMessage("Fitur pemulihan password belum tersedia.")
              }
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Sign In"}
          </button>

          {message && (
            <p className="login-message">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login