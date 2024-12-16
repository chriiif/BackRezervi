const db = require("../config/db");
const addOffer = (name, date_debut, date_fin, description,id_destination, callback) => {
  const sql =
    "INSERT INTO offer (name, date_debut, date_fin, description,id_destination) VALUES (?, ?, ?, ?,?)";

  db.query(sql, [name, date_debut, date_fin, description,id_destination], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const getOffersByOwnerId = (id,callback)=>{
  const sql = "SELECT offer.id,offer.name,offer.date_debut,offer.date_fin,offer.description,destination.name as `destination_name`,destination.image FROM `offer`,`destination` WHERE id_destination = destination.id and destination.id_owner = ?;";
  db.query(sql, [id], callback);
}

const getAllOffers = (callback) => {
  const sql = "SELECT * FROM offer";

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const deleteOfferById = (id, callback) => {
  const sql = "DELETE FROM offer WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const updateOfferById = (
  id,
  name,
  date_debut,
  date_fin,
  description,
  callback
) => {
  const sql = `UPDATE offer 
               SET name = ?, date_debut = ?, date_fin = ?, description = ? 
               WHERE id = ?`;

  db.query(
    sql,
    [name, date_debut, date_fin, description, id],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};
module.exports = { addOffer, getAllOffers, deleteOfferById, updateOfferById,getOffersByOwnerId };
