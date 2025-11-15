import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/managerDashboard.css";

import ModelsSection from "../components/manager/ModelsSection";
import ContractsSection from "../components/manager/ContractsSection";

const ManagerDashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const agencyId = localStorage.getItem("userAgencyId");
    const navigate = useNavigate();


    return (
        <div className="manager-dashboard">
            <nav className={`manager-nav ${sidebarOpen ? "" : "closed"}`}>
                <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? "⮜" : "⮞"}
                </button>
                {sidebarOpen && (
                    <>
                        <h2>Manager Dashboard</h2>
                        <ul>
                            <li><a href="#models">Models</a></li>
                            <li><a href="#contracts">Contracts</a></li>
                        </ul>
                        <button
                            className="back-button"
                            onClick={() => navigate("/")}
                        >
                            ⬅ Back to Homepage
                        </button>

                    </>
                )}
            </nav>

            <main className="manager-content">
                <section id="models">
                    <h3>Manage Models</h3>
                    <ModelsSection agencyId={agencyId} />
                </section>
                <section id="contracts">
                    <h3>Manage Contracts</h3>
                    <ContractsSection agencyId={agencyId} />
                </section>
            </main>
        </div>
    );
};

export default ManagerDashboard;
