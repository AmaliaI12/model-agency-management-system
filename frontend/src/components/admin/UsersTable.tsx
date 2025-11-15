import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

const UsersTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editing, setEditing] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<Partial<User>>({});

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });
        setNewUser({});
        fetchUsers();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("User ID:", editing.id);
        await fetch(`http://localhost:5000/api/users/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchUsers();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
        fetchUsers();
    };

    return (
        <div className="admin-section">
            <h3>Users</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name || ""}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={newUser.email || ""}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={newUser.password || ""}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />

                <select
                    value={newUser.role || ""}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="">Select role</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="Client">Client</option>
                </select>
                <button type="submit">Add</button>
            </form>

            {/* Users table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>
                    editing?.id === user.id ? (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></td>
                            <td><input value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} /></td>
                            <td>
                                <select
                                    value={editing.role}
                                    onChange={(e) =>
                                        setEditing({ ...editing, role: e.target.value })
                                    }
                                >
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Client">Client</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => setEditing(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default UsersTable;