const ratingModel = require("../models/ratingModel");

exports.addRating = (req, res) => {
    const { restaurant_id, client_id, rating } = req.body;
  
    // Validate the input parameters
    if (!restaurant_id || !client_id || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Call the model's addRating function with a callback
    ratingModel.addRating(restaurant_id, client_id, rating, (err, result) => {
      if (err) {
        console.error("Error in controller:", err);
        return res.status(500).json({ error: 'Error adding rating', details: err.message });
      }
  
      // Send success response
      res.status(200).json({ message: 'Rating added successfully', result });
    });
  };
exports.getAverageRating = async (req, res) => {
    const restaurantId = req.params.id;  // Ensure the correct restaurantId is passed in params

    // Validate restaurantId
    if (!restaurantId || isNaN(restaurantId)) {
        console.error("Invalid restaurant ID:", restaurantId);
        return res.status(400).json({ error: "Invalid restaurant ID" });
    }

    console.log("Received request for average rating of restaurantId:", restaurantId);

    try {
        // Call the model to get the average rating
        ratingModel.calculateAverageRating(restaurantId, (err, result) => {
            if (err) {
                console.error("Error fetching average rating:", err);
                return res.status(500).json({ error: "Error calculating average rating", details: err });
            }

            // Check if result contains the average rating
            if (result && result.averageRating !== undefined) {
                res.status(200).json({ averageRating: result.averageRating });
            } else {
                res.status(200).json({ averageRating: 0 });
            }
        });
    } catch (error) {
        // Log detailed error message and send a generic error response
        console.error("Error in controller while fetching average rating:", error.message);
        res.status(500).json({ error: "Error calculating average rating" });
    }
};