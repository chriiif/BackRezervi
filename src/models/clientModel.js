const db = require("../config/db");

// Find a client by email
const findClientByEmail = (email, callback) => {
  const query = `SELECT * FROM client WHERE email = ?`;
  db.query(query, [email], callback);
};

// Add a new client
const addClient = (firstName, lastName, email, phone, password, callback) => {
  const insertQuery = `INSERT INTO client (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
  db.query(insertQuery, [firstName, lastName, email, phone, password], callback);
};
// Get all clients
const getAllClients = (callback) => {
  const sql = "SELECT * FROM client";
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getClientById = (idClient, callback) => {
  const sql = "SELECT * FROM client WHERE idClient = ?";
  db.query(sql, [idClient], callback)
 
};

// Delete a client by ID
const deleteClientById = (idClient, callback) => {
  const sql = "DELETE FROM client WHERE idClient = ?";
  db.query(sql, [idClient], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Update a client by ID
const updateClientById = (idClient, firstName, lastName, email, phone, callback) => {
  const sql = `UPDATE client 
               SET firstName = ?, lastName = ?, email = ?, phone = ? 
               WHERE idClient = ?`;
  db.query(sql, [firstName, lastName, email, phone, idClient], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  findClientByEmail,
  addClient,
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientById,
};
