import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Participation {
    modelName: string;
    eventName: string;
    role: string;
    payment: number;
}

const ParticipationsTable: React.FC = () => {
    const [participations, setParticipations] = useState<Participation[]>([]);
    const [editing, setEditing] = useState<Participation | null>(null);
    const [newParticipation, setNewParticipation] = useState<Partial<Participation>>({});

    const fetchParticipations = async () => {
        const res = await fetch("http://localhost:5000/api/participations");
        const data = await res.json();
        setParticipations(data);
    };

    useEffect(() => {
        fetchParticipations();
    }, []);

    // CREATE
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/participations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newParticipation),
        });
        setNewParticipation({});
        fetchParticipations();
    };

    // UPDATE
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;

        await fetch(
            `http://localhost:5000/api/participations/${editing.modelName}/${editing.eventName}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            }
        );

        setEditing(null);
        fetchParticipations();
    };

    // DELETE
    const handleDelete = async (modelId: string, eventId: string) => {
        await fetch(
            `http://localhost:5000/api/participations/${modelId}/${eventId}`,
            { method: "DELETE" }
        );
        fetchParticipations();
    };

    return (
        <div className="admin-section">
            <h3>Participations</h3>

            {/* ADD FORM */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Model"
                    value={newParticipation.modelName || ""}
                    onChange={(e) =>
                        setNewParticipation({ ...newParticipation, modelName: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Event"
                    value={newParticipation.eventName || ""}
                    onChange={(e) =>
                        setNewParticipation({ ...newParticipation, eventName: e.target.value })
                    }
                />

                <select
                    value={newParticipation.role || ""}
                    onChange={(e) =>
                        setNewParticipation({ ...newParticipation, role: e.target.value })
                    }
                >
                    <option value="">Select Role</option>
                    <option value="Model">Model</option>
                    <option value="Main Model">Main Model</option>
                    <option value="Supporting Model">Supporting Model</option>
                    <option value="Special Guest">Special Guest</option>
                </select>

                <input
                    type="number"
                    placeholder="Payment"
                    value={newParticipation.payment || ""}
                    onChange={(e) =>
                        setNewParticipation({ ...newParticipation, payment: Number(e.target.value) })
                    }
                />

                <button type="submit">Add</button>
            </form>

            {/* TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Event</th>
                        <th>Role</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {participations.map((p) =>
                        editing &&
                        editing.modelName === p.modelName &&
                        editing.eventName === p.eventName ? (
                            <tr key={`${p.modelName}-${p.modelName}`}>
                                <td>{p.modelName}</td>
                                <td>{p.eventName}</td>

                                <td>
                                    <input
                                        value={editing.role}
                                        onChange={(e) =>
                                            setEditing({ ...editing, role: e.target.value })
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={editing.payment}
                                        onChange={(e) =>
                                            setEditing({
                                                ...editing,
                                                payment: Number(e.target.value),
                                            })
                                        }
                                    />
                                </td>

                                <td>
                                    <button onClick={handleUpdate}>Save</button>
                                    <button onClick={() => setEditing(null)}>Cancel</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={`${p.modelName}-${p.eventName}`}>
                                <td>{p.modelName}</td>
                                <td>{p.eventName}</td>
                                <td>{p.role}</td>
                                <td>{p.payment}</td>

                                <td>
                                    <button onClick={() => setEditing(p)}>Edit</button>
                                    <button onClick={() => handleDelete(p.modelName, p.eventName)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipationsTable;
