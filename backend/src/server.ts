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


app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const pool = await getConnection();

    // Check if email already exists
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

// AGENTII
app.get('/api/agentii', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        AgentieID AS id, 
        NumeAgentie AS name, 
        Adresa AS adresa, 
        Email AS email, 
        Telefon AS telefon
      FROM Agentii
    `);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch agencies" });
  }
});

app.post('/api/agentii', async (req, res) => {
  const { name, adresa, email, telefon } = req.body;
  if (!name || !adresa || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("NumeAgentie", name)
      .input("Adresa", adresa)
      .input("Email", email)
      .input("Telefon", telefon || "")
      .query(`
        INSERT INTO Agentii (NumeAgentie, Adresa, Email, Telefon)
        OUTPUT INSERTED.AgentieID AS id, INSERTED.NumeAgentie AS name, INSERTED.Adresa AS adresa, INSERTED.Email AS email, INSERTED.Telefon AS telefon
        VALUES (@NumeAgentie, @Adresa, @Email, @Telefon)
      `);

    await pool.close();
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create agency" });
  }
});

app.put('/api/agentii/:id', async (req, res) => {
  const { id } = req.params;
  const { name, adresa, email, telefon } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("AgentieID", id)
      .input("NumeAgentie", name)
      .input("Adresa", adresa)
      .input("Email", email)
      .input("Telefon", telefon)
      .query(`
        UPDATE Agentii
        SET NumeAgentie=@NumeAgentie, Adresa=@Adresa, Email=@Email, Telefon=@Telefon
        WHERE AgentieID=@AgentieID
      `);

    await pool.close();
    res.json({ message: "Agency updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update agency" });
  }
});

app.delete('/api/agentii/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("AgentieID", id).query("DELETE FROM Agentii WHERE AgentieID = @AgentieID");
    await pool.close();
    res.json({ message: "Agency deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete agency" });
  }
});


// MODELE

// GET all models
app.get('/api/modele', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        ModelID AS id, 
        NumeModel AS lastName, 
        PrenumeModel AS firstName, 
        Varsta AS age, 
        Inaltime AS height,
        Greutate AS weight,
        AgentieID AS agencyId,
        DataInregistrare AS date,
        CategorieID AS categoryId,
        Sex AS gender
      FROM Modele
    `);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch modele" });
  }
});

// POST create new model
app.post("/api/modele", async (req, res) => {
  const { firstName, lastName, age, height, weight, agencyId, categoryId, gender } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("PrenumeModel", firstName)
      .input("NumeModel", lastName)
      .input("Varsta", age)
      .input("Inaltime", height)
      .input("Greutate", weight)
      .input("AgentieID", agencyId)
      .input("DataInregistrare", "01/10/2025")
      .input("CategorieID", categoryId)
      .input("Sex", gender)
      .query(`
        INSERT INTO Modele (NumeModel, PrenumeModel, Varsta, Inaltime, Greutate, AgentieID, DataInregistrare, CategorieID, Sex)
        VALUES (@NumeModel, @PrenumeModel, @Varsta, @Inaltime, @Greutate, @AgentieID, @DataInregistrare, @CategorieID, @Sex)
      `);

    await pool.close();
    res.status(201).json({ message: "Model created successfully" });
  } catch (error) {
    console.error("Error creating model:", error);
    res.status(500).json({ error: "Failed to create model" });
  }
});

// PUT update model
app.put("/api/modele/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, height, weight, agencyId, date, categoryId, gender } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ModelID", id)
      .input("PrenumeModel", firstName)
      .input("NumeModel", lastName)
      .input("Varsta", age)
      .input("Inaltime", height)
      .input("Greutate", weight)
      .input("AgentieID", agencyId)
      .input("DataInregistrare", date)
      .input("CategorieID", categoryId)
      .input("Sex", gender)
      .query(`
        UPDATE Modele
        SET 
          PrenumeModel = @PrenumeModel,
          NumeModel = @NumeModel,
          Varsta = @Varsta,
          Inaltime = @Inaltime,
          Greutate = @Greutate,
          AgentieID = @AgentieID,
          DataInregistrare = @DataInregistrare,
          CategorieID = @CategorieID,
          Sex = @Sex
        WHERE ModelID = @ModelID
      `);

    await pool.close();
    res.json({ message: "Model updated successfully" });
  } catch (error) {
    console.error("Error updating model:", error);
    res.status(500).json({ error: "Failed to update model" });
  }
});

// DELETE model
app.delete("/api/modele/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request().input("ModelID", id).query("DELETE FROM Modele WHERE ModelID = @ModelID");
    await pool.close();
    res.json({ message: "Model deleted successfully" });
  } catch (error) {
    console.error("Error deleting model:", error);
    res.status(500).json({ error: "Failed to delete model" });
  }
});


// LOCATIONS

// GET all locations
app.get('/api/locations', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        LocatieID AS id, 
        NumeLocatie AS name, 
        Adresa AS adresa, 
        Oras AS city, 
        Capacitate AS capacity,
        TelefonContact AS phone
      FROM Locatii
    `);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

// POST create new location
app.post("/api/locations", async (req, res) => {
  const { name, adresa, city, capacity, phone } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("NumeLocatie", name)
      .input("Adresa", adresa)
      .input("Oras", city)
      .input("Capacitate", capacity)
      .input("TelefonContact", phone)
      .query(`
        INSERT INTO Locatii (NumeLocatie, Adresa, Oras, Capacitate, TelefonContact)
        VALUES (@NumeLocatie, @Adresa, @Oras, @Capacitate, @TelefonContact)
      `);

    await pool.close();
    res.status(201).json({ message: "Location created successfully" });
  } catch (error) {
    console.error("Error creating model:", error);
    res.status(500).json({ error: "Failed to create Location" });
  }
});

// PUT update location
app.put("/api/locations/:id", async (req, res) => {
  const { id } = req.params;
   const { name, adresa, city, capacity, phone } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("LocatieID", id)
      .input("NumeLocatie", name)
      .input("Adresa", adresa)
      .input("Oras", city)
      .input("Capacitate", capacity)
      .input("TelefonContact", phone)
      .query(`
        UPDATE Locatii
        SET 
          NumeLocatie = @NumeLocatie,
          Adresa = @Adresa,
          Oras = @Oras,
          Capacitate = @Capacitate,
          TelefonContact = @TelefonContact
        WHERE LocatieID = @LocatieID
      `);

    await pool.close();
    res.json({ message: "Location updated successfully" });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Failed to update location" });
  }
});

// DELETE location
app.delete("/api/locations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request().input("LocatieID", id).query("DELETE FROM Locatii WHERE LocatieID = @LocatieID");
    await pool.close();
    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ error: "Failed to delete location" });
  }
});


// CLIENTS

// GET all clients
app.get('/api/clients', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        ClientID AS id, 
        NumeClient AS name, 
        TipClient AS cliType,
        Telefon AS phone,
        Email AS email, 
        Adresa AS adress
      FROM Clienti
    `);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// POST create new clients
app.post("/api/clients", async (req, res) => {
  const { name, adress, email, phone, cliType } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("NumeClient", name)
      .input("TipClient", cliType)
      .input("Telefon", phone)
      .input("Email", email)
      .input("Adresa", adress)
      .query(`
        INSERT INTO Clienti (NumeClient, TipClient, Telefon, Email, Adresa)
        VALUES (@NumeClient, @TipClient, @Telefon, @Email, @Adresa)
      `);

    await pool.close();
    res.status(201).json({ message: "Client created successfully" });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client" });
  }
}); 

// PUT update clients
app.put("/api/clients/:id", async (req, res) => {
  const { id } = req.params;
   const { name, adress, email, phone, cliType } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ClientID", id)
      .input("NumeClient", name)
      .input("TipClient", cliType)
      .input("Telefon", phone)
      .input("Email", email)
      .input("Adresa", adress)
      .query(`
        UPDATE Clienti
        SET 
          NumeClient = @NumeClient,
          TipClient = @TipClient,
          Telefon = @Telefon,
          Email = @Email,
          Adresa = @Adresa
        WHERE ClientID = @ClientID
      `);

    await pool.close();
    res.json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Failed to update client" });
  }
});

// DELETE client
app.delete("/api/clients/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request().input("ClientID", id).query("DELETE FROM Clienti WHERE ClientID = @ClientID");
    await pool.close();
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Failed to delete client" });
  }
});


// CATEGORIES

// GET all Categorys
app.get('/api/Categories', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        CategorieID AS id, 
        DenumireCategorie AS name, 
        Descriere AS description
      FROM Categorii
    `);
    res.json(result.recordset);
    await pool.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST create new Categorys
app.post("/api/categories", async (req, res) => {
  const { name, description } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("DenumireCategorie", name)
      .input("Descriere", description)
      .query(`
        INSERT INTO Categorii (DenumireCategorie, Descriere)
        VALUES (@DenumireCategorie, @Descriere)
      `);

    await pool.close();
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({ error: "Failed to create Category" });
  }
}); 

// PUT update categories
app.put("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("CategorieID", id)
      .input("DenumireCategorie", name)
      .input("Descriere", description)
      .query(`
        UPDATE Categorii
        SET 
          DenumireCategorie = @DenumireCategorie,
          Descriere = @Descriere
        WHERE CategorieID = @CategorieID
      `);

    await pool.close();
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ error: "Failed to update Category" });
  }
});

// DELETE category
app.delete("/api/categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    await pool.request().input("CategorieID", id).query("DELETE FROM Categorii WHERE CategorieID = @CategorieID");
    await pool.close();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
