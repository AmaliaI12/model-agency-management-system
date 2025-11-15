import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Contract {
    id: number;
    modelId: number;
    clientId: number;
    startDate: string;
    status: string;
    contractType: string;
    payment: number;
}

const ContractsTable: React.FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [editing, setEditing] = useState<Contract | null>(null);
    const [newContract, setNewContract] = useState<Partial<Contract>>({});

    const fetchContracts = async () => {
        const res = await fetch("http://localhost:5000/api/contracts");
        const data = await res.json();
        setContracts(data);
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    // Handle create
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/contracts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContract),
        });
        setNewContract({});
        fetchContracts();
    };

    // Handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        console.error("Contract ID:", editing.id);
        await fetch(`http://localhost:5000/api/contracts/${editing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        setEditing(null);
        fetchContracts();
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:5000/api/contracts/${id}`, { method: "DELETE" });
        fetchContracts();
    };

    return (
        <div className="admin-section">
            <h3>Contracts</h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="number"
                    placeholder="Model ID"
                    value={newContract.modelId || ""}
                    onChange={(e) => setNewContract({ ...newContract, modelId: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Client ID"
                    value={newContract.clientId || ""}
                    onChange={(e) => setNewContract({ ...newContract, clientId: Number(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Start Date"
                    value={newContract.startDate || ""}
                    onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Value"
                    value={newContract.payment || ""}
                    onChange={(e) => setNewContract({ ...newContract, payment: Number(e.target.value) })}
                />
                <select
                    value={newContract.status || ""}
                    onChange={(e) => setNewContract({ ...newContract, status: e.target.value })}
                >
                    <option value="">Select Status</option>
                    <option value="Finalizat">Done</option>
                    <option value="Activ">Active</option>
                    <option value="Reziliat">Terminated</option>
                    <option value="Planificat">Planned</option>
                </select>

                <select
                    value={newContract.contractType || ""}
                    onChange={(e) => setNewContract({ ...newContract, contractType: e.target.value })}
                >
                    <option value="">Contract Type</option>
                    <option value="Promovare">Promo</option>
                    <option value="Exclusivitate">Exclusive</option>
                    <option value="Temporar">Temporary</option>
                    <option value="Colaborare">Colab</option>
                </select>


                <button type="submit">Add</button>
            </form>



            {/* Contracts table */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Model ID</th>
                    <th>Client ID</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Contract Type</th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contracts.map((contract) =>
                    editing?.id === contract.id ? (
                        <tr key={contract.id}>
                            <td>{contract.id}</td>
                            <td><input value={editing.modelId} onChange={(e) => setEditing({ ...editing, modelId: Number(e.target.value) })} /></td>
                            <td><input value={editing.clientId} onChange={(e) => setEditing({ ...editing, clientId: Number(e.target.value) })} /></td>
                            <td><input value={editing.startDate} onChange={(e) => setEditing({ ...editing, startDate: e.target.value })} /></td>
                            <td>
                                <select
                                    value={editing.status}
                                    onChange={(e) =>
                                        setEditing({ ...editing, status: e.target.value })
                                    }
                                >
                                    <option value="Finalizat">Done</option>
                                    <option value="Activ">Active</option>
                                    <option value="Reziliat">Terminated</option>
                                    <option value="Planificat">Planned</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    value={editing.contractType}
                                    onChange={(e) =>
                                        setEditing({ ...editing, status: e.target.value })
                                    }
                                >
                                    <option value="Promovare">Promo</option>
                                    <option value="Exclusivitate">Exclusive</option>
                                    <option value="Temporar">Temporary</option>
                                    <option value="Colaborare">Colab</option>
                                </select>
                            </td>
                            <td><input value={editing.payment} onChange={(e) => setEditing({ ...editing, payment: Number(e.target.value) })} /></td>
                            <td>
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditing(null)}>Cancel</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={contract.id}>
                            <td>{contract.id}</td>
                            <td>{contract.modelId}</td>
                            <td>{contract.clientId}</td>
                            <td>{contract.startDate.slice(0, 10)}</td>
                            <td>{contract.status}</td>
                            <td>{contract.contractType}</td>
                            <td>{contract.payment}</td>
                            <td>
                                <button onClick={() => setEditing(contract)}>Edit</button>
                                <button onClick={() => handleDelete(contract.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>

        </div>
    );
};

export default ContractsTable;