const db = require("../config/db");

const findOwnerByEmail = (email, callback) => {
  const query = "SELECT * FROM owner WHERE email = ?";
  db.query(query, [email], callback);
};

const findOwnerById = (id, callback) => {
  const query = "SELECT * FROM owner WHERE id = ?";
  db.query(query, [id], callback);
};

const addOwner = (name, email, password, phone, callback) => {
  const insertQuery =
    "INSERT INTO owner (name, email, password, phone) VALUES (?, ?, ?, ?)";
  db.query(insertQuery, [name, email, password, phone], callback);
};

const updateOwner = (id, name, email, phone, password, res) => {
  let updateQuery;
  let params;

  if (password) {
    updateQuery =
      "UPDATE owner SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
    params = [name, email, phone, password, id];
  } else {
    updateQuery =
      "UPDATE owner SET name = ?, email = ?, phone = ? WHERE id = ?";
    params = [name, email, phone, id];
  }

  db.query(updateQuery, params, (err, result) => {
    if (err) {
      console.error("Error updating owner:", err);
      return res.status(500).json({ error: "Failed to update owner" });
    }
    res.json({ message: "Owner updated successfully" });
  });
};

const getAllOwners = (callback) => {
  const query = "SELECT * FROM owner";
  db.query(query, callback);
};

const updateOwnerById = (id, data, callback) => {
  const updateQuery =
    "UPDATE owner SET name = ?, email = ?, phone = ? WHERE id = ?";
  db.query(updateQuery, [data.name, data.email, data.phone, id], callback);
};

const deleteOwnerById = (id, callback) => {
  const deleteQuery = "DELETE FROM owner WHERE id = ?";
  db.query(deleteQuery, [id], callback);
};

module.exports = {
  findOwnerByEmail,
  addOwner,
  findOwnerById,
  updateOwner,
  getAllOwners,
  deleteOwnerById,
  updateOwnerById,
};
