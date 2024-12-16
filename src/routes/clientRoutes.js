const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  ajouterClient,
  getClients,
  getClient, // Import the new getClient function
  deleteClient,
  updateClient,
} = require("../controllers/clientController");

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/addClient", ajouterClient);
router.get("/allClients", getClients);
router.get("/:idClient", getClient); 
router.delete("/deleteClient/:idClient", deleteClient);
router.put("/updateClient/:idClient", updateClient);

module.exports = router;
