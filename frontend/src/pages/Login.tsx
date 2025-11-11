import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(""); // API error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Reset error
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        // Redirect based on role
        switch (data.rol) {
          case 'admin':
            navigate('/admin');
            break;
          case 'manager':
            navigate('/manager');
            break;
          case 'client':
            navigate('/client');
            break;
          default:
            navigate('/'); // fallback
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
          </div>

          {error && <p className="error-text" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1 }}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
            No account? Sign up now!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
