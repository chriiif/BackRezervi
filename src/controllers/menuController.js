// src/controllers/menuController.js
const Menu = require("../models/Menu");

exports.createMenu = (req, res) => {
  const newMenu = req.body;
  Menu.create(newMenu, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Menu item created", id: results.insertId });
  });
};

exports.getMenus = (req, res) => {
    const { id } = req.params;
  Menu.getAll(id,(err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.getAllByOwnerId = (req,res)=>{
  const {id}= req.params
  Menu.getAllByOwnerId(id,(err,results)=>{
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  })
}



exports.updateMenu = (req, res) => {
  const { id } = req.params;
  const updatedMenu = req.body;
  Menu.update(id, updatedMenu, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Menu item updated" });
  });
};

exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  Menu.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Menu item deleted" });
  });
};
