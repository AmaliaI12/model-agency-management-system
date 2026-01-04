import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import SidebarLeft from "./SidebarLeft";
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

  // MODELS
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

  // SEARCH STATES - MODELS
  const [modelName, setModelName] = useState("");
  const [modelGender, setmodelGender] = useState("");
  const [minHeight, setMinHeight] = useState("");

  const searchModels = async () => {
    const params = new URLSearchParams();

    if (modelName.trim() !== "") {
      params.append("name", modelName);
    }

    if (modelGender !== "") {
      params.append("gender", modelGender);
    }

    if (minHeight !== "") {
      params.append("minHeight", minHeight);
    }

    const url =
      params.toString().length > 0
        ? `http://localhost:5000/api/modele/search?${params.toString()}`
        : "http://localhost:5000/api/modele";

    console.log(url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setModels(data);
      setShowModels(true);
    } catch (err) {
      console.error("Search failed", err);
    }
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

  // SEARCH AGENCY
  const [agencyName, setAgencyName] = useState("");
  const [agencyCity, setAgencyCity] = useState("");

  const searchAgency = async () => {
    const params = new URLSearchParams();

    if (agencyName.trim() !== "") {
      params.append("name", agencyName);
    }

    if (agencyCity.trim() !== "") {
      params.append("agencyCity", agencyCity);
    }

    const url =
      params.toString().length > 0
        ? `http://localhost:5000/api/agencies/search?${params.toString()}`
        : "http://localhost:5000/api/agentii";

    console.log(url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setAgencies(data);
      setShowAgencies(true);
    } catch (err) {
      console.error("Search failed", err);
    }
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

  // SEARCH STATES - MODELS
  const [locationName, setLocationName] = useState("");
  const [city, setCity] = useState("");
  const [minCapacity, setMinCapacity] = useState("");

  const searchLocation = async () => {
    const params = new URLSearchParams();

    if (locationName.trim() !== "") {
      params.append("name", locationName);
    }

    if (city !== "") {
      params.append("city", city);
    }

    if (minCapacity !== "") {
      params.append("minCapacity", minCapacity);
    }

    const url =
      params.toString().length > 0
        ? `http://localhost:5000/api/locations/search?${params.toString()}`
        : "http://localhost:5000/api/locations";

    console.log(url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setLocations(data);
      setShowLocations(true);
    } catch (err) {
      console.error("Search failed", err);
    }
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
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />

                <select
                  value={modelGender}
                  onChange={(e) => setmodelGender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>

                <input
                  type="number"
                  placeholder="Min height"
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                />

                <button onClick={searchModels}>
                  Search
                </button>
              </div>
            )}

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
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Search by city"
                  value={agencyCity}
                  onChange={(e) => setAgencyCity(e.target.value)}
                />
                <button onClick={searchAgency}>
                  Search
                </button>
              </div>
            )}

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
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Search city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Min capacity"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                />

                <button onClick={searchLocation}>
                  Search
                </button>
              </div>
            )}

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
          <p>
            © {new Date().getFullYear()} Model Agency Management. All rights
            reserved.
          </p>
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
