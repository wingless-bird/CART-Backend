const express = require("express");
const router = express.Router();

const {
    loginAdmin,
    getCurrentAdmin,
    logoutAdmin,
    changeCredentials
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// LOGIN — sets an httpOnly cookie
router.post("/login", loginAdmin);

// SESSION CHECK — used on page load to see if the cookie is still valid
router.get("/me", verifyToken, getCurrentAdmin);

// LOGOUT — clears the cookie
router.post("/logout", logoutAdmin);

// CHANGE CREDENTIALS (must be logged in)
router.put("/change-credentials", verifyToken, changeCredentials);

module.exports = router;