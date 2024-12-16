// src/routes/menuRoutes.js
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.post("/", menuController.createMenu);
router.get("/:id", menuController.getMenus);
router.get("/owner_menu/:id", menuController.getAllByOwnerId);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
