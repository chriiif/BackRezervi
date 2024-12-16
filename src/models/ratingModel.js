const db = require("../config/db");

// Add a new rating using a callback
const addRating = (restaurant_id, client_id, rating, callback) => {
  const query = 'INSERT INTO rating (restaurant_id, client_id, rating) VALUES (?, ?, ?)';

  db.query(query, [restaurant_id, client_id, rating], (err, result) => {
    if (err) {
      console.error("Error adding rating:", err);
      return callback(err, null); // Return error if query fails
    }

    // If successful, return the result
    callback(null, result);
  });
};

// Get all ratings for a restaurant
const getRatingsByRestaurantId = (restaurantId, callback) => {
  const sql = "SELECT * FROM rating WHERE restaurant_id = ?";
  db.query(sql, [restaurantId], callback);
};

// Calculate average rating for a restaurant
const calculateAverageRating = (restaurantId, callback) => {
  const sql = "SELECT AVG(rating) AS averageRating FROM rating WHERE restaurant_id = ?";

  db.query(sql, [restaurantId], (err, result) => {
    if (err) {
      return callback(err, null); // Return error if query fails
    }

    // If no ratings exist, result is an empty array, so return 0
    if (!result[0] || result[0].averageRating === null) {
      return callback(null, { averageRating: 0 }); // No ratings found
    }

    // Return the result as an object with averageRating
    callback(null, { averageRating: result[0].averageRating });
  });
};

// Export the functions
module.exports = { addRating, getRatingsByRestaurantId, calculateAverageRating };
