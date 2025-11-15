import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Agency {
    id: number;
    name: string;
    adresa: string;
    email: string;
    telefon: string;
}

const AgenciesTable: React.FC = () => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [editing, setEditing] = useState<Agency | null>(null);
    const [newAgency, setNewAgency] = useState<Partial<Agency>>({});

    // Fetch all agencies
    const fetchAgencies = async () => {
        const res = await fetch("http://localhost:5000/api/agentii");
        const data = await res.json();
        setAgencies(data);
    };


    useEffect(() => {
        fetchAgencies();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/agentii", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAgency),
        });
        setNewAgency({});
        fetchAgencies();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("Model ID:", editing.id);
        await fetch(`http://localhost:5000/api/agentii/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchAgencies();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/agentii/${id}`, { method: "DELETE" });
        fetchAgencies();
    };

    return (
        <div className="admin-section">
            <h3>Agencies</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newAgency.name || ""}
                    onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Adresa"
                    value={newAgency.adresa || ""}
                    onChange={(e) => setNewAgency({ ...newAgency, adresa: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newAgency.email || ""}
                    onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Telefon"
                    value={newAgency.telefon || ""}
                    onChange={(e) => setNewAgency({ ...newAgency, telefon: e.target.value })}
                />
                <button type="submit">Add</button>
            </form>



            {/* Agencies table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Adresa</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {agencies.map((agency) =>
                    editing?.id === agency.id ? (
                        <tr key={agency.id}>
                            <td>{agency.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.adresa} onChange={(e) => setEditing({ ...editing, adresa: e.target.value })} /></td>
                            <td><input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></td>
                            <td><input value={editing.telefon} onChange={(e) => setEditing({ ...editing, telefon: e.target.value })} /></td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={agency.id}>
                            <td>{agency.id}</td>
                            <td>{agency.name}</td>
                            <td>{agency.adresa}</td>
                            <td>{agency.email}</td>
                            <td>{agency.telefon}</td>
                            <td>
                                <button onClick={() => setEditing(agency)}>Edit</button>
                                <button onClick={() => handleDelete(agency.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default AgenciesTable;
