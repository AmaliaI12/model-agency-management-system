import React, { useEffect, useState } from "react";

interface TopEarningModel {
    model_name: string;
    total_earnings: number;
}

interface ModelAboveAvg {
    NumeModel: string;
    PrenumeModel: string;
    TotalCastig: number;
}

interface TopAgency {
    NumeAgentie: string;
    Email: string;
}

interface DominantCategory {
    DenumireCategorie: string;
    VenitCategorie: number;
    VenitTotalSistem: number;
}

interface PremiumEvent {
    NumeEveniment: string;
    Buget: number;
    NumeLocatie: string;
}

const SidebarLeft: React.FC = () => {
    const [topModels, setTopModels] = useState<TopEarningModel[]>([]);
    const [modelsAboveAvg, setModelsAboveAvg] = useState<ModelAboveAvg[]>([]);
    const [topAgencies, setTopAgencies] = useState<TopAgency[]>([]);
    const [dominantCategories, setDominantCategories] = useState<DominantCategory[]>([]);
    
    const [premiumEvents, setPremiumEvents] = useState<PremiumEvent[]>([]);
    const [minBudget, setMinBudget] = useState<number>(5000); // Valoarea default

    useEffect(() => {
        // 1. Top Models
        fetch("http://localhost:5000/api/stats/top-models-by-contract-value")
            .then(res => res.json())
            .then(data => setTopModels(data))
            .catch(err => console.error("Err top-models:", err));

        // 2. Models Above Avg
        fetch("http://localhost:5000/api/stats/models-above-avg-revenue")
            .then(res => res.json())
            .then(data => setModelsAboveAvg(data))
            .catch(err => console.error("Err models-above-avg:", err));

        // 3. Top Tier Agencies
        fetch("http://localhost:5000/api/stats/top-tier-agencies")
            .then(res => res.json())
            .then(data => setTopAgencies(data))
            .catch(err => console.error("Err top-tier-agencies:", err));

        // 4. Dominant Categories
        fetch("http://localhost:5000/api/stats/dominant-categories")
            .then(res => res.json())
            .then(data => setDominantCategories(data))
            .catch(err => console.error("Err dominant-categories:", err));
    }, []);

    // Fetch separat pentru Premium Events (dependent de minBudget)
    const fetchPremiumEvents = () => {
        fetch(`http://localhost:5000/api/stats/premium-events?minBudget=${minBudget}`)
            .then(res => res.json())
            .then(data => setPremiumEvents(data))
            .catch(err => console.error("Err premium-events:", err));
    };

    // Initial fetch for premium events
    useEffect(() => {
        fetchPremiumEvents();
    }, []);

    return (
        <div className="sidebar-left">
            <h3>Advanced Analytics</h3>

            <div className="stats-grid">

                {/* 1. Top 5 Models (Interogare Clasica) */}
                <div className="stat-card">
                    <strong>Top Models (Total)</strong>
                    <ul className="stat-list">
                        {topModels.length > 0 ? topModels.map((m, idx) => (
                            <li key={idx}>{m.model_name} – €{m.total_earnings}</li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>

                {/* 2. Models Above Average (Subquery in HAVING & FROM) */}
                <div className="stat-card">
                    <strong>Models Above Avg Revenue</strong>
                    <p style={{fontSize: '0.8rem', color: '#666'}}>Earned more than avg model</p>
                    <ul className="stat-list">
                        {modelsAboveAvg.length > 0 ? modelsAboveAvg.map((m, idx) => (
                            <li key={idx}>
                                {m.PrenumeModel} {m.NumeModel} – €{m.TotalCastig}
                            </li>
                        )) : <li>No models found or Loading...</li>}
                    </ul>
                </div>

                {/* 3. Top Tier Agencies (EXISTS Operator) */}
                <div className="stat-card">
                    <strong>Elite Agencies</strong>
                    <p style={{fontSize: '0.8rem', color: '#666'}}>With high budget events</p>
                    <ul className="stat-list">
                        {topAgencies.length > 0 ? topAgencies.map((a, idx) => (
                            <li key={idx}>
                                {a.NumeAgentie} <br/>
                                <span style={{fontSize: '0.75rem', color: '#888'}}>{a.Email}</span>
                            </li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>

                {/* 4. Dominant Categories (Subquery in SELECT) */}
                <div className="stat-card">
                    <strong>Dominant Categories</strong>
                    <p style={{fontSize: '0.8rem', color: '#666'}}> 10% of total system revenue</p>
                    <ul className="stat-list">
                        {dominantCategories.length > 0 ? dominantCategories.map((c, idx) => (
                            <li key={idx}>
                                {c.DenumireCategorie} – €{c.VenitCategorie}
                            </li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>

                {/* 5. Premium Events (Parametru Variabil) */}
                <div className="stat-card">
                    <strong>Premium Events Filter</strong>
                    <div style={{ margin: '10px 0', display: 'flex', gap: '5px' }}>
                        <input 
                            type="number" 
                            value={minBudget} 
                            onChange={(e) => setMinBudget(Number(e.target.value))}
                            style={{ width: '70px', padding: '2px' }}
                        />
                        <button onClick={fetchPremiumEvents} style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                            Update
                        </button>
                    </div>
                    <ul className="stat-list">
                        {premiumEvents.length > 0 ? premiumEvents.map((e, idx) => (
                            <li key={idx}>
                                <strong>{e.NumeEveniment}</strong><br/>
                                Budget: €{e.Buget} @ {e.NumeLocatie}
                            </li>
                        )) : <li>No events found for this budget.</li>}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default SidebarLeft;