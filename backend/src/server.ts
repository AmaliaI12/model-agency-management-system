// server.ts
import express from "express";
import cors from "cors";
import { getConnection } from './database.ts';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello!' });
});

// Get all Agentii
app.get('/api/agentii', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Agentii");
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch agentii" });
  }
});

// Get Agentie by ID
app.get('/api/agentii/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM Agentii WHERE AgentieID = @id");
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: "Agentie not found" });
    }
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch agentie" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
