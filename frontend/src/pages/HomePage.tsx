import React, { useState } from "react";
import "../styles/Homepage.css";
import Login from "./Login";
import Signup from "./Signup";

const HomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Model Agency</div>
        <div className="navbar-links">
          <button className="nav-btn" onClick={() => setShowLogin(true)}> Login </button>
          <button className="nav-btn" onClick={() => setShowSignup(true)}> Sign up </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Discover. Connect. Inspire.</h1>
          <p>Connecting top models with world-class agencies and brands.</p>
        </div>
      </section>

      {/* Carousel Sections */}
      <section className="carousel-section">
        <h2>Our Locations</h2>
        <div className="carousel">
          <img src="../../images/studio1.jpg" alt="Photo Studio" />
          <img src="../../images/location3.jpg" alt="Runway Photos" />
          <img src="../../images/runway1.jpg" alt="Location 3" />
        </div>
      </section>

      <section className="carousel-section">
        <h2>Partner Agencies</h2>
        <div className="carousel">
          <img src="../../images/agency2.jpg" alt="Agency 1" />
          <img src="../../images/agency1.jpg" alt="Agency 2" />
          <img src="../../images/agency3.jpg" alt="Agency 3" />
        </div>
      </section>

      <section className="carousel-section">
        <h2>Top Models</h2>
        <div className="carousel">
          <img src="../../images/model1.jpg" alt="Model 1" />
          <img src="../../images/model2.jpg" alt="Model 2" />
          <img src="../../images/model3.jpg" alt="Model 3" />
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            Contact us at:{" "}
            <a href="mailto:info@modelagency.com">info@modelagency.com</a>
          </p>
          <p>
            © {new Date().getFullYear()} Model Agency Management. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Login Popup */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <Login />
          </div>
        </div>
      )}

       {/* Signup Popup */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowSignup(false)}>
                ×
            </button>
            <Signup />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
