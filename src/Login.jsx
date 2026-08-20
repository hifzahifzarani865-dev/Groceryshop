import { useState } from "react";

function Login({ onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLoginSuccess();
  };

  return (
    <div className="auth-overlay">

      <div className="auth-box">

        <button
          className="close-btn"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="auth-logo">
          🛒 FreshMart
        </div>

        <h2>
          {isSignup
            ? "Create Account"
            : "Welcome Back"}
        </h2>

        <p className="auth-subtitle">
          {isSignup
            ? "Create your FreshMart account"
            : "Login to continue shopping"}
        </p>

        <form onSubmit={handleSubmit}>

          {isSignup && (

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >
            {isSignup
              ? "Create Account"
              : "Login"}
          </button>

        </form>

        <p className="switch-auth">

          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() =>
              setIsSignup(!isSignup)
            }
          >
            {isSignup
              ? " Login"
              : " Sign Up"}
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;