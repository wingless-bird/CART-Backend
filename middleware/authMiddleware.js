const jwt = require("jsonwebtoken");

// ==========================================================
// VERIFY TOKEN
// Protects a route by requiring a valid "Authorization: Bearer <token>"
// header. On success, attaches the decoded admin info to req.admin.
// ==========================================================
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({ message: "Invalid or expired token" });

    }

};

module.exports = verifyToken;