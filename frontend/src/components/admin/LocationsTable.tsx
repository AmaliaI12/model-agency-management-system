import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Location {
    id: number;
    name: string;
    adresa: string;
    city: string;
    capacity: number;
    phone: string;
}

const LocationsTable: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [editing, setEditing] = useState<Location | null>(null);
    const [newLocation, setNewLocation] = useState<Partial<Location>>({});

    // Fetch all locations
    const fetchLocations = async () => {
        const res = await fetch("http://localhost:5000/api/locations");
        const data = await res.json();
        setLocations(data);
    };


    useEffect(() => {
        fetchLocations();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/locations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLocation),
        });
        setNewLocation({});
        fetchLocations();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        await fetch(`http://localhost:5000/api/locations/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchLocations();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/locations/${id}`, { method: "DELETE" });
        fetchLocations();
    };

    return (
        <div className="admin-section">
            <h3>Locations</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newLocation.name || ""}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Adresa"
                    value={newLocation.adresa || ""}
                    onChange={(e) => setNewLocation({ ...newLocation, adresa: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={newLocation.city || ""}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={newLocation.capacity || ""}
                    onChange={(e) => setNewLocation({ ...newLocation, capacity: Number(e.target.value) })}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={newLocation.phone || ""}
                    onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                />

                <button type="submit">Add</button>
            </form>



            {/* Locations table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>City</th>
                    <th>Capacity</th>
                    <th>Contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {locations.map((location) =>
                    editing?.id === location.id ? (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.adresa} onChange={(e) => setEditing({ ...editing, adresa: e.target.value })} /></td>
                            <td><input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} /></td>
                            <td><input value={editing.capacity} onChange={(e) => setEditing({ ...editing, capacity: Number(e.target.value) })} /></td>
                            <td><input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>{location.name}</td>
                            <td>{location.adresa}</td>
                            <td>{location.city}</td>
                            <td>{location.capacity}</td>
                            <td>{location.phone}</td>
                            <td>
                                <button onClick={() => setEditing(location)}>Edit</button>
                                <button onClick={() => handleDelete(location.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default LocationsTable;
