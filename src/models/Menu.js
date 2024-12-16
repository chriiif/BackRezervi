// src/models/Menu.js
const db = require("../config/db"); // adjust path to your db connection file

const Menu = {
  create: (menu, callback) => {
    const query = "INSERT INTO Menu (name, category, price, id_destination) VALUES (?, ?, ?, ?)";
    db.query(query, [menu.name, menu.category, menu.price, menu.id_destination], callback);
  },

  getAll: (id,callback) => {
    const query = "SELECT * FROM Menu where id_destination = ?";
    db.query(query,[id], callback);
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM Menu WHERE id = ?";
    db.query(query, [id], callback);
  },

  update: (id, menu, callback) => {
    const query = "UPDATE Menu SET name = ?, category = ?, price = ?, id_destination = ? WHERE id = ?";
    db.query(query, [menu.name, menu.category, menu.price, menu.id_destination, id], callback);
  },

  delete: (id, callback) => {
    const query = "DELETE FROM Menu WHERE id = ?";
    db.query(query, [id], callback);
  },
  getAllByOwnerId:(id,callback)=>{
    const query = `select menu.id,menu.name,price,category from menu, destination,owner WHERE id_destination = destination.id and destination.id_owner = owner.id and owner.id = ${id}`;
    db.query(query,[id],callback);
  }
};

module.exports = Menu;
