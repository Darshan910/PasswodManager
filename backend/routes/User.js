const express = require("express");
const router = express.Router();

const {
    login,
    signUp,
} = require("../controllers/Auth");


// Route for login
router.post('/login', login);

// Route for signUp
router.post('/signup', signUp);

module.exports = router;