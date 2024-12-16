const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createDestination,
  removeDestination,
  listDestinations,
  getOneDestination,
  acceptDestination,
  listDestinationsDemand,
  rejectDestination,
  updateDestination,
  listDestinationsByownerId
} = require("../controllers/destinationController");

router.post(
  "/add",
  upload.fields([{ name: "image" }, { name: "menu" }]),
  createDestination
);
router.delete("/delete/:id", removeDestination);
router.get("/", listDestinations);
router.get("/owner/:id", listDestinationsByownerId);
router.get("/demands", listDestinationsDemand);
router.get("/:id", getOneDestination);
router.put("/accept/:id", acceptDestination);
router.put("/reject/:id", rejectDestination);
router.put("/update/:id", updateDestination);


module.exports = router;
