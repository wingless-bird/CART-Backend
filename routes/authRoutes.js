const express = require("express");
const router = express.Router();

const {
    loginAdmin,
    changeCredentials
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// LOGIN
router.post("/login", loginAdmin);

// CHANGE CREDENTIALS (must be logged in)
router.put("/change-credentials", verifyToken, changeCredentials);

module.exports = router;