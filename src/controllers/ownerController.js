const bcrypt = require("bcrypt");
const {
  findOwnerByEmail,
  addOwner,
  findOwnerById,
  updateOwner,
  deleteOwnerById,
  getAllOwners, // Import de la fonction
} = require("../models/ownerModel");

const signup = (req, res) => {
  const { name, email, password, phone } = req.body;

  findOwnerByEmail(email, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      addOwner(name, email, hashedPassword, phone, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error inserting owner" });
        }

        return res
          .status(201)
          .json({ message: "Owner registered successfully" });
      });
    });
  });
};

const getOwnerById = (req, res) => {
  const id = req.params.id;
  findOwnerById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const editProfile = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      updateOwner(id, name, email, phone, hashedPassword, res);
    });
  } else {
    updateOwner(id, name, email, phone, null, res);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  findOwnerByEmail(email, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const owner = result[0];

    bcrypt.compare(password, owner.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res
        .status(200)
        .json({ message: "Login successful", ownerId: owner.id });
    });
  });
};

const getAllOwnersController = (req, res) => {
  getAllOwners((err, result) => {
    if (err) {
      console.error("Error fetching all owners:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(result);
  });
};

const deleteOwnerByIdController = (req, res) => {
  const { id } = req.params;

  deleteOwnerById(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting owner" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  });
};
const updateOwnerByIdController = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  updateOwnerById(id, { name, email, phone }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating owner" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner updated successfully" });
  });
};

module.exports = {
  signup,
  login,
  getOwnerById,
  editProfile,
  deleteOwnerByIdController,
  getAllOwnersController,
  updateOwnerByIdController // Exportation du contrôleur
};
