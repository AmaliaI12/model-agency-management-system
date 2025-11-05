// import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Log In</button>
          <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
            You agree to our terms and policies
          </p>
          <button type="button" className="secondary-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
