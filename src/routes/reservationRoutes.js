const express = require("express");
const router = express.Router();
const { 
  createReservation, 
  rejectReservationHandler, 
  listReservations, 
  reservationById, 
  destinationByClientId, 
  acceptReservationHandler 
} = require("../controllers/reservationController");

// List all reservations
router.get("/", listReservations);

// Create a new reservation
router.post("/add/:idDestination", createReservation);

// Get reservations by owner ID
router.get("/:ownerId", reservationById);

// Get reservations by client ID
router.get("/clientRes/:clientId", destinationByClientId);

// Accept reservation (by reservation ID)
router.put("/:id/accept", acceptReservationHandler);

// Reject reservation (by reservation ID)
router.put("/:id/reject", rejectReservationHandler);

module.exports = router;
