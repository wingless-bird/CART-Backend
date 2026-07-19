const jwt = require("jsonwebtoken");

// ==========================================================
// VERIFY TOKEN
// Protects a route by requiring a valid JWT in the httpOnly
// "token" cookie. On success, attaches the decoded admin info
// to req.admin.
// ==========================================================
const verifyToken = (req, res, next) => {

    const token = req.cookies && req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({ message: "Invalid or expired token" });

    }

};

module.exports = verifyToken;