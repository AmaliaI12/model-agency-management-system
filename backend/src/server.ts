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

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", email)
      .input("parola", password)
      .query("SELECT email, rol FROM utilizatori WHERE email = @email AND parola = @parola");

    await pool.close();

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({ message: "Login successful", email: user.email, rol: user.rol });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// server.ts (add this below your existing routes)
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const pool = await getConnection();

    // Optional: check if email already exists
    const existingUser = await pool
      .request()
      .input("email", email)
      .query("SELECT email FROM utilizatori WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      await pool.close();
      return res.status(400).json({ error: "Email already registered." });
    }

    // Insert new user (default role: client)
    await pool
      .request()
      .input("name", name)
      .input("email", email)
      .input("parola", password)
      .input("rol", "client")
      .query("INSERT INTO Utilizatori (nume, email, parola, rol) VALUES (@name, @email, @parola, @rol)");

    await pool.close();
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
