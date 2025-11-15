import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Client {
    id: number;
    name: string;
    cliType: string;
    phone: string;
    email: string;
    adress: string;
}

const ClientsTable: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [editing, setEditing] = useState<Client | null>(null);
    const [newClient, setNewClient] = useState<Partial<Client>>({});

    const fetchClients = async () => {
        const res = await fetch("http://localhost:5000/api/clients");
        const data = await res.json();
        setClients(data);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClient),
        });
        setNewClient({});
        fetchClients();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("Client ID:", editing.id);
        await fetch(`http://localhost:5000/api/clients/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchClients();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/clients/${id}`, { method: "DELETE" });
        fetchClients();
    };

    return (
        <div className="admin-section">
            <h3>Clients</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newClient.name || ""}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Adress"
                    value={newClient.adress || ""}
                    onChange={(e) => setNewClient({ ...newClient, adress: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={newClient.email || ""}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={newClient.phone || ""}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                />

                <select
                    value={newClient.cliType || ""}
                    onChange={(e) => setNewClient({ ...newClient, cliType: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="Companie">Company</option>
                    <option value="Persoana fizica">Personal</option>
                </select>
                <button type="submit">Add</button>
            </form>



            {/* Clients table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) =>
                    editing?.id === client.id ? (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.adress} onChange={(e) => setEditing({ ...editing, adress: e.target.value })} /></td>
                            <td><input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></td>
                            <td><input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></td>
                            <td>
                                <select
                                    value={editing.cliType}
                                    onChange={(e) =>
                                        setEditing({ ...editing, cliType: e.target.value })
                                    }
                                >
                                    <option value="Companie">Company</option>
                                    <option value="Persoana fizica">Person</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.adress}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.cliType}</td>
                            <td>
                                <button onClick={() => setEditing(client)}>Edit</button>
                                <button onClick={() => handleDelete(client.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default ClientsTable;