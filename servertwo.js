const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Sample user ID
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// Helper function to determine the highest alphabet
const getHighestAlphabet = (alphabets) => {
    return alphabets.reduce((highest, current) => {
        return current.toUpperCase() > highest.toUpperCase() ? current : highest;
    }, '');
};

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id: userId,
            message: "Invalid input format. Please provide an array."
        });
    }

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (item.length === 1 && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    // Determine the highest alphabet
    const highestAlphabet = alphabets.length > 0 ? [getHighestAlphabet(alphabets)] : [];

    // Construct response
    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    };

    res.json(response);
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: "OPERATION_SUCCESS" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});