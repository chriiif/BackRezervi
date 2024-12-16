const { 
  getDestinationByClientID, 
  addReservation, 
  getAllReservations, 
  getReservationByOwnerID, 
  acceptReservation, 
  refuseReservation 
} = require("../models/reservationModel");

const createReservation = (req, res) => {
  const idDestination = req.params.idDestination;
  const { idClient, numberOfPersons, reservationDate } = req.body;

  addReservation({ idClient, idDestination, numberOfPersons, reservationDate }, (err, result) => {
    if (err) {
      return res.status(500).json({ err: err });
    }
    res.status(200).send(result);
  });
};

const listReservations = (req, res) => {
  getAllReservations((err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};

const reservationById = (req, res) => {
  const ownerId = req.params.ownerId;
  getReservationByOwnerID(ownerId, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des réservations');
    } else {
      res.send(results);
    }
  });
};

const acceptReservationHandler = (req, res) => {
  const reservationId = req.params.id;
  acceptReservation(reservationId, (error, results) => {
    if (error) {
      res.status(500).send('Error accepting the reservation');
    } else {
      res.json(results);  // Sending the updated reservation status
    }
  });
};

const rejectReservationHandler = (req, res) => {
  const reservationId = req.params.id;
  refuseReservation(reservationId, (error, results) => {
    if (error) {
      res.status(500).send('Error rejecting the reservation');
    } else {
      res.json(results);  // Sending the result after rejecting the reservation
    }
  });
};

const destinationByClientId = (req, res) => {
  const clientId = req.params.clientId; 
  getDestinationByClientID(clientId, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des destinations');
    } else {
      res.json(results);
    }
  });
};

module.exports = { 
  createReservation, 
  listReservations, 
  reservationById, 
  acceptReservationHandler, 
  rejectReservationHandler, 
  destinationByClientId 
};
