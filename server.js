const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Sample user ID
const userId = "john_doe_17091999";
// POST method endpoint
app.post('/details', (req, res) => {
    const { numbers, alphabets } = req.body;
    // Validate input
    if (!Array.isArray(numbers) || !Array.isArray(alphabets)) {
        return res.status(400).json({
            is_success: false,
            user_id: userId,
            message: "Invalid input format. Please provide arrays for numbers and alphabets."
        });
    }

 // Helper function to determine the highest alphabet
    const getHighestAlphabet = (alphabets) => {
        return alphabets.reduce((highest, current) => {
            return current.toUpperCase() > highest.toUpperCase() ? current : highest;
        }, '');
    };
    
    // Construct response
    const response = {
        is_success: true,
        user_id: userId,
        college_email: req.body.college_email || "example@college.edu",
        college_roll_number: req.body.college_roll_number || "123456",
        numbers: numbers,
        alphabets: alphabets
    };

    res.json(response);
});
// GET method endpoint
app.get('/details', (req, res) => {
    res.json({ operation_code: "OPERATION_SUCCESS" });
});
// Start the server
app.listen(5000, function() {
    console.log(`Server is running on http://localhost:${5000}`);
});