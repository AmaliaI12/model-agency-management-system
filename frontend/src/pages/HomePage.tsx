import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import ModelViewer from "../components/client/ModelViewer";
import AgencyViewer from "../components/client/AgencyViewer";
import LocationViewer from "../components/client/LocationViewer";
import "../styles/Homepage.css";

interface UserData {
  id: number;
  name: string;
  rol: string;
  agencyId?: number;
}

const HomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<UserData | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userAgencyId");
    setUser(null);
    setDropdownOpen(false);
  };

  // VIEW CONTROL
  const [showModels, setShowModels] = useState(false);
  const [models, setModels] = useState([]);

  const toggleModels = async () => {
    if (!showModels) {
      try {
        const res = await fetch("http://localhost:5000/api/modele");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error("Failed to fetch models", err);
      }
    }
    setShowModels(!showModels);
  };

  // AGENCIES
  const [showAgencies, setShowAgencies] = useState(false);
  const [agencies, setAgencies] = useState([]);

  const toggleAgencies = async () => {
    if (!showAgencies) {
      try {
        const res = await fetch("http://localhost:5000/api/agentii");
        const data = await res.json();
        setAgencies(data);
      } catch (err) {
        console.error("Failed to fetch agencies", err);
      }
    }
    setShowAgencies(!showAgencies);
  };

  // LOCATIONS
  const [showLocations, setShowLocations] = useState(false);
  const [locations, setLocations] = useState([]);

  const toggleLocations = async () => {
    if (!showLocations) {
      try {
        const res = await fetch("http://localhost:5000/api/locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    }
    setShowLocations(!showLocations);
  };


  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Model Agency</div>
        <div className="navbar-links">
          {!user ? (
            <>
              <button className="nav-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button className="nav-btn" onClick={() => setShowSignup(true)}>
                Sign up
              </button>
            </>
          ) : (
            <div className="user-menu">
              <div
                className="user-name"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Hello, {user.name}! ▼
              </div>

              {dropdownOpen && (
                <div className="dropdown">
                  <button
                    onClick={() => {
                      window.location.href = "/settings";
                      setDropdownOpen(false);
                    }}
                  >
                    Settings
                  </button>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Discover. Connect. Inspire.</h1>
          <p>Connecting top models with world-class agencies and brands.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <SidebarLeft />

        <div className="center-content">
          {/* CAROUSEL 1: MODELS */}
          <section className="carousel-section">
            <h2>Top Models</h2>
            <div className="carousel">
              <img src="../../images/Carousels/model1.jpg" alt="Model 1" />
              <img src="../../images/Carousels/model2.jpg" alt="Model 2" />
              <img src="../../images/Carousels/model3.jpg" alt="Model 3" />
            </div>
            <button className="view-btn" onClick={toggleModels}>
              {showModels ? "Hide Models" : "View Models"}
            </button>
            {showModels && (
              <div className="models-section">
                <ModelViewer models={models} />
              </div>
            )}
          </section>

          {/* CAROUSEL 2: AGENCIES */}
          <section className="carousel-section">
            <h2>Partner Agencies</h2>
            <div className="carousel">
              <img src="../../images/Carousels/agency2.jpg" alt="Agency 1" />
              <img src="../../images/Carousels/agency1.jpg" alt="Agency 2" />
              <img src="../../images/Carousels/agency3.jpg" alt="Agency 3" />
            </div>
            <button className="view-btn" onClick={toggleAgencies}>
              {showAgencies ? "Hide Agencies" : "View Agencies"}
            </button>
            {showAgencies && (
              <div className="agencies-section">
                <AgencyViewer agencies={agencies} />
              </div>
            )}
          </section>

          {/* CAROUSEL 3: LOCATIONS */}
          <section className="carousel-section">
            <h2>Our Locations</h2>
            <div className="carousel">
              <img src="../../images/Carousels/studio1.jpg" alt="Studio" />
              <img src="../../images/Carousels/location3.jpg" alt="Location" />
              <img src="../../images/Carousels/runway1.jpg" alt="Runway" />
            </div>
            <button className="view-btn" onClick={toggleLocations}>
              {showLocations ? "Hide Locations" : "View Locations"}
            </button>
            {showLocations && (
              <div className="locations-section">
                <LocationViewer locations={locations} />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            Contact us at:{" "}
            <a href="mailto:info@modelagency.com">info@modelagency.com</a>
          </p>
          <p>© {new Date().getFullYear()} Model Agency Management. All rights reserved.</p>
        </div>
      </footer>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <Login
              onLoginSuccess={(userData: UserData) => {
                setUser(userData);
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}

      {/* SIGNUP POPUP */}
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
