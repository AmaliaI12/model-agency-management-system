import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Category {
    id: number;
    name: string;
    description: string;
}

const CategoriesTable: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editing, setEditing] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState<Partial<Category>>({});

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory),
        });
        setNewCategory({});
        fetchCategories();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("Category ID:", editing.id);
        await fetch(`http://localhost:5000/api/categories/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchCategories();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
        fetchCategories();
    };

    return (
        <div className="admin-section">
            <h3>Categories</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newCategory.name || ""}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newCategory.description || ""}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button type="submit">Add</button>
            </form>

            {/* Categories table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) =>
                    editing?.id === category.id ? (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></td>
                            <td><input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button onClick={() => setEditing(category)}>Edit</button>
                                <button onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default CategoriesTable;