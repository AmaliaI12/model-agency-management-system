// AgentiiList.tsx
import React, { useEffect, useState } from "react";

interface Agentie {
  AgentieID: number;
  NumeAgentie: string;
  Adresa: string;
  Telefon: string;
  Email: string;
  UtilizatorID: number;
}

const AgentiiList: React.FC = () => {
  const [agentii, setAgentii] = useState<Agentie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/agentii") // make sure your server is running
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setAgentii(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista Agentii</h1>
      <ul>
        {agentii.map((a) => (
          <li key={a.AgentieID}>
            <strong>{a.NumeAgentie}</strong> — {a.Adresa}, {a.Telefon}, {a.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentiiList;
