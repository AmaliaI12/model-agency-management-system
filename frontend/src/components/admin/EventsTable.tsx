import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Event {
    id: number;
    name: string;
    date: string;
    locationName: string;
    clientName: string;
    buget: number;
    description: string;
    status: string;
}

const EventsTable: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [editing, setEditing] = useState<Event | null>(null);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({});

    const fetchEvents = async () => {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });
        setNewEvent({});
        fetchEvents();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("Event ID:", editing.id);
        await fetch(`http://localhost:5000/api/events/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchEvents();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
        fetchEvents();
    };

    return (
        <div className="admin-section">
            <h3>Events</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newEvent.name || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Event date"
                    value={newEvent.date || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newEvent.locationName || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, locationName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Client"
                    value={newEvent.clientName || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, clientName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Buget"
                    value={newEvent.buget || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, buget: Number(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <select
                    value={newEvent.status || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                >
                    <option value="">Select Status</option>
                    <option value="Planificat">Planned</option>
                    <option value="Confirmat">Terminated</option>
                    <option value="Finalizat">Done</option>
                    <option value="Anulat">Active</option>
                </select>
                <button type="submit">Add</button>
            </form>

            {/* Events table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Event Date</th>
                    <th>Location</th>
                    <th>Client</th>
                    <th>Buget</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) =>
                    editing?.id === event.id ? (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></td>
                            <td><input value={editing.locationName} onChange={(e) => setEditing({ ...editing, locationName: e.target.value })} /></td>
                            <td><input value={editing.clientName} onChange={(e) => setEditing({ ...editing, clientName: e.target.value })} /></td>
                            <td><input value={editing.buget} onChange={(e) => setEditing({ ...editing, buget: Number(e.target.value) })} /></td>
                            <td><input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></td>
                            <td>
                                <select
                                    value={editing.status}
                                    onChange={(e) =>
                                        setEditing({ ...editing, status: e.target.value })
                                    }
                                >
                                    <option value="Planificat">Planned</option>
                                    <option value="Confirmat">Confirmed</option>
                                    <option value="Finalizat">Done</option>
                                    <option value="Anulat">Canceled</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.date.slice(0, 10)}</td>
                            <td>{event.locationName}</td>
                            <td>{event.clientName}</td>
                            <td>{event.buget}</td>
                            <td>{event.description}</td>
                            <td>{event.status}</td>
                            <td>
                                <button onClick={() => setEditing(event)}>Edit</button>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default EventsTable;