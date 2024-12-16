const express = require("express");
const router=express.Router();
const ratingController = require("../controllers/ratingController");
router.get('/average/:id', ratingController.getAverageRating); 
// Route to add a new rating
router.post('/add', ratingController.addRating);

// Route to get the average rating for a restaurant


module.exports = router;
