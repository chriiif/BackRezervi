const db = require("../config/db");

const addReservation = (data, callback) => {
  const { idClient, idDestination, numberOfPersons, reservationDate } = data;
  const sql = "INSERT INTO Reservation (idClient, idRestaurant, numberOfPersons, reservationDate) VALUES (?,?,?,?)";
  db.query(sql, [idClient, idDestination, numberOfPersons, reservationDate], callback);
};

const getAllReservations = (callback) => {
  const sql = "SELECT * FROM Reservation";
  db.query(sql, callback);
};

const getReservationByOwnerID = (ownerId, callback) => {
  const sql = `
    SELECT Reservation.*, Destination.name, Destination.adresse, Destination.phone
    FROM Reservation
    JOIN Destination ON Reservation.idRestaurant = Destination.id
    JOIN Owner ON Destination.id_owner = Owner.id
    WHERE Owner.id = ? and status = 'attente';
  `;
  db.query(sql, [ownerId], (err, results) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      callback(err, null);
    } else {
      console.log("Reservations fetched:", results); // Log the results here
      callback(null, results);
    }
  });
};

const acceptReservation = (reservationId, callback) => {
  const sql = "UPDATE Reservation SET status = 'accepted' WHERE idReservation = ?";
  db.query(sql, [reservationId], (err, results) => {
    if (err) {
      console.error('Error updating reservation status:', err);
      callback(err, null);
    } else if (results.affectedRows === 0) {
      callback('Reservation not found', null);
    } else {
      callback(null, { message: 'Reservation accepted successfully' });
    }
  });
};

const refuseReservation = (reservationId, callback) => {
  const sql = "DELETE FROM Reservation WHERE idReservation = ?";
  db.query(sql, [reservationId], (err, results) => {
    if (err) {
      console.error('Error deleting reservation:', err);
      callback(err, null);
    } else if (results.affectedRows === 0) {
      callback('Reservation not found', null);
    } else {
      callback(null, { message: 'Reservation rejected successfully' });
    }
  });
};

const getDestinationByClientID = (clientId, callback) => {
  const sql = `
    SELECT Reservation.*, Destination.name, Destination.adresse, Destination.phone
    FROM Reservation
    JOIN Destination ON Reservation.idRestaurant = Destination.id
    WHERE Reservation.idClient = ?;
  `;
  db.query(sql, [clientId], callback);
};

module.exports = { 
  addReservation, 
  getAllReservations, 
  getReservationByOwnerID, 
  acceptReservation, 
  refuseReservation, 
  getDestinationByClientID 
};
