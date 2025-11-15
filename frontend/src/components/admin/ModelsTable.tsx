import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

interface Model {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  agencyId: number;
  date: string;
  categoryId: number;
  gender: string;
}

const ModelsTable: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [editing, setEditing] = useState<Model | null>(null);
  const [newModel, setNewModel] = useState<Partial<Model>>({});

  // Fetch all models
  const fetchModels = async () => {
    const res = await fetch("http://localhost:5000/api/modele");
    const data = await res.json();
    setModels(data);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Handle create
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/modele", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newModel),
    });
    setNewModel({});
    fetchModels();
  };

  // // Handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    await fetch(`http://localhost:5000/api/modele/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchModels();
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/api/modele/${id}`, { method: "DELETE" });
    fetchModels();
  };

  return (
    <div className="admin-section">
      <h3>Models</h3>

      {/* Add form */}
      <form onSubmit={handleAdd} className="admin-form">
        <input
          type="text"
          placeholder="First Name"
          value={newModel.firstName || ""}
          onChange={(e) =>
            setNewModel({ ...newModel, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newModel.lastName || ""}
          onChange={(e) =>
            setNewModel({ ...newModel, lastName: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Age"
          value={newModel.age ?? ""}
          onChange={(e) =>
            setNewModel({ ...newModel, age: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={newModel.height ?? ""}
          onChange={(e) =>
            setNewModel({ ...newModel, height: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={newModel.weight ?? ""}
          onChange={(e) =>
            setNewModel({ ...newModel, weight: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Agency ID"
          value={newModel.agencyId ?? ""}
          onChange={(e) =>
            setNewModel({ ...newModel, agencyId: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Category ID"
          value={newModel.categoryId ?? ""}
          onChange={(e) =>
            setNewModel({ ...newModel, categoryId: Number(e.target.value) })
          }
        />
        <select
          value={newModel.gender || ""}
          onChange={(e) => setNewModel({ ...newModel, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Models Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Agency ID</th>
            <th className={editing ? "hide-column" : ""}>Date</th>
            <th>Category ID</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) =>
            editing?.id === model.id ? (
              <tr key={model.id}>
                <td>{model.id}</td>
                <td>
                  <input
                    value={editing.firstName}
                    onChange={(e) =>
                      setEditing({ ...editing, firstName: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editing.lastName}
                    onChange={(e) =>
                      setEditing({ ...editing, lastName: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editing.age}
                    onChange={(e) =>
                      setEditing({ ...editing, age: Number(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editing.height}
                    onChange={(e) =>
                      setEditing({ ...editing, height: Number(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editing.weight}
                    onChange={(e) =>
                      setEditing({ ...editing, weight: Number(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editing.agencyId}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        agencyId: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editing.categoryId}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        categoryId: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <select
                    value={editing.gender}
                    onChange={(e) =>
                      setEditing({ ...editing, gender: e.target.value })
                    }
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </td>
                <td>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={model.id}>
                <td>{model.id}</td>
                <td>{model.firstName}</td>
                <td>{model.lastName}</td>
                <td>{model.age}</td>
                <td>{model.height}</td>
                <td>{model.weight}</td>
                <td>{model.agencyId}</td>
                <td className={editing ? "hide-column" : ""}>
                  {model.date?.slice(0, 10)}
                </td>

                <td>{model.categoryId}</td>
                <td>{model.gender}</td>
                <td>
                  <button onClick={() => setEditing(model)}>Edit</button>
                  <button onClick={() => handleDelete(model.id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModelsTable;
