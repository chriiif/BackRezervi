const bcrypt = require("bcrypt");
const {
  addClient,
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientById,
  findClientByEmail,
} = require("../models/clientModel");

// Client signup
const signup = (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  findClientByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (result.length > 0)
      return res.status(400).json({ message: "Client already exists" });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });

      addClient(firstName, lastName, email, phone, hashedPassword, (err) => {
        if (err)
          return res.status(500).json({ message: "Error inserting client" });
        return res
          .status(201)
          .json({ message: "Client registered successfully" });
      });
    });
  });
};

// Client login
const login = (req, res) => {
  const { email, password } = req.body;

  findClientByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (result.length === 0)
      return res.status(404).json({ message: "Client not found" });

    const client = result[0];
    bcrypt.compare(password, client.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Internal Server Error" });
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      return res
        .status(200)
        .json({ message: "Login successful", clientId: client.idClient });
    });
  });
};

// Add a new client
const ajouterClient = (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  addClient(firstName, lastName, email, phone, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(201)
      .json({ message: "Client ajouté avec succès", result });
  });
};

// Get all clients
const getClients = (req, res) => {
  getAllClients((err, clients) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ clients });
  });
};

const getClient = (req, res) => {
  const { idClient } = req.params;

  getClientById(idClient,(err,result)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};

// Delete client by ID
const deleteClient = (req, res) => {
  const { idClient } = req.params;

  deleteClientById(idClient, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    return res.status(200).json({ message: "Client supprimé avec succès" });
  });
};

// Update client by ID
const updateClient = (req, res) => {
  const { idClient } = req.params;
  const { firstName, lastName, email, phone } = req.body;

  updateClientById(idClient, firstName, lastName, email, phone, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    return res.status(200).json({ message: "Client mis à jour avec succès" });
  });
};

module.exports = {
  signup,
  login,
  ajouterClient,
  getClients,
  getClient, // Added the new getClient method here
  deleteClient,
  updateClient,
};
