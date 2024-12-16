const db = require("../config/db");

const addDestination = (data, callback) => {
  const { name, tables, image, adresse, description, phone, type, id_owner } =
    data;
  const sql =
    "INSERT INTO Destination (name, tables, image, adresse, description, phone, type, id_owner) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [name, tables, image, adresse, description, phone, type, id_owner],
    callback
  );
};

const deleteDestination = (id, callback) => {
  const sql = "DELETE FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};

const putDestination = (id, data, callback) => {
  const { name, tables, adresse, description, phone, type } = data;
  const sql = `
    UPDATE Destination 
    SET name = ?, tables = ?, adresse = ?, description = ?, phone = ?, type = ? WHERE id = ?`;
  db.query(
    sql,
    [name, tables, adresse, description, phone, type, id],
    callback
  );
};

const getAllDestinations = (callback) => {
  const sql = "SELECT * FROM Destination WHERE state = 'true'";
  db.query(sql, callback);
};

const getAllDestinationsDemand = (callback) => {
  const sql = `
    SELECT 
      Destination.id,
      Destination.name,
      Destination.image,
      Destination.tables,
      Destination.adresse,
      Destination.description,
      Destination.phone,
      Destination.type,
      Destination.state,
      Destination.id_owner,
      owner.email
    FROM Destination
    INNER JOIN owner ON owner.id = Destination.id_owner
    WHERE Destination.state = ''`;
  db.query(sql, callback);
};

const getDestinationById = (id, callback) => {
  const sql = "SELECT * FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};

const putDestinationById = (id, callback) => {
  const sql = "UPDATE Destination SET state = 'true' WHERE id = ?";
  db.query(sql, id, callback);
};

const rejectDestinationById = (id, callback) => {
  const sql = "DELETE FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};
const getDestinationbyOwnerId = (id, callback) => {
  const sql = "SELECT * FROM destination WHERE id_owner = ? and state = 'true'";
  db.query(sql, [id], callback);
};


module.exports = {
  addDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationById,
  putDestinationById,
  getAllDestinationsDemand,
  rejectDestinationById,
  putDestination,
  getDestinationbyOwnerId
};
