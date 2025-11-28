import React, { useEffect, useState } from "react";

interface TopModel {
    full_name: string;
    total_events: number;
}

interface TopAgency {
    agency_name: string;
    total_models: number;
}

interface LocationStat {
    name: string;
    total_events: number;
}

interface EventToday {
    id: number;
    name: string;
    location: string;
}

const SidebarLeft: React.FC = () => {
    const [topModel, setTopModel] = useState<TopModel | null>(null);
    const [topAgency, setTopAgency] = useState<TopAgency | null>(null);
    const [topLocations, setTopLocations] = useState<LocationStat[]>([]);
    const [eventsToday, setEventsToday] = useState<EventToday[]>([]);
    const [modelsByCategory, setModelsByCategory] = useState<{ category_name: string, total_models: number }[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/stats/top-model')
            .then(res => res.json())
            .then(data => setTopModel(data));

        fetch('http://localhost:5000/api/stats/top-agency')
            .then(res => res.json())
            .then(data => setTopAgency(data));

        fetch('http://localhost:5000/api/stats/top-locations')
            .then(res => res.json())
            .then(data => setTopLocations(data));

        fetch('http://localhost:5000/api/stats/events-today')
            .then(res => res.json())
            .then(data => setEventsToday(data));

        fetch('http://localhost:5000/api/stats/models-by-category')
            .then(res => res.json())
            .then(data => setModelsByCategory(data));
    }, []);

    return (
        <div className="sidebar-left">
            <h3>Statistics</h3>

            {/* Events Today */}
            <div className="stat-card">
                <div className="stat-text">
                    <strong>Events Today</strong>
                    <ul className="stat-list">
                        {eventsToday.length ? eventsToday.map(ev => (
                            <li key={ev.id}>{ev.name} @ {ev.location}</li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>
            </div>

            {/* Top Model */}
            <div className="stat-card-image">
                <img src="../../images/stats/top-model.jpg" alt="Top Model" />
                <div className="stat-text">
                    <strong>Top Model</strong>
                    {topModel ? <span>{topModel.full_name}
                    </span> : <span>Loading...</span>}
                </div>
            </div>

            {/* Models by Category */}
            <div className="stat-card">
                <div className="stat-text">
                    <strong>Models by Category</strong>
                    <ul className="stat-list">
                        {modelsByCategory.length ? modelsByCategory.map(cat => (
                            <li key={cat.category_name}>{cat.category_name}: {cat.total_models}</li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>
            </div>

            {/* Top Agency */}
            <div className="stat-card-image">
                <img src="../../images/stats/top-agency.jpg" alt="Top Agency" />
                <div className="stat-text">
                    <strong>Top Agency</strong>
                    {topAgency ? <span>{topAgency.agency_name}
                    </span> : <span>Loading...</span>}
                </div>
            </div>

            {/* Top Locations */}
            <div className="stat-card">
                <div className="stat-text">
                    <strong>Top Locations</strong>
                    <ul className="stat-list">
                        {topLocations.length ? topLocations.map(loc => (
                            <li key={loc.name}>{loc.name} ({loc.total_events})</li>
                        )) : <li>Loading...</li>}
                    </ul>
                </div>
            </div>

        </div>

    );
};

export default SidebarLeft;
