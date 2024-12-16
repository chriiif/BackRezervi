const express = require("express");
const router = express.Router();
const {
  ajouterOffer,
  getOffers,
  deleteOffer,
  updateOffer,
  getoffersByOwnerId
} = require("../controllers/offerController");

router.post("/addOffer", ajouterOffer);

router.get("/allOffers", getOffers);
router.get("/offetsbyowner/:id", getoffersByOwnerId);

router.delete("/deleteOffer/:id", deleteOffer);

router.put("/updateOffer/:id", updateOffer);

module.exports = router;
