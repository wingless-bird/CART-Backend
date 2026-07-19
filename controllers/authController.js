const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const COOKIE_NAME = "token";

// Cross-origin (Vercel <-> Render) cookies require SameSite=None + Secure
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 8 * 60 * 60 * 1000 // 8 hours, matches JWT expiry below
};

// ==========================================================
// LOGIN — issues an httpOnly JWT cookie
// ==========================================================
const loginAdmin = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.cookie(COOKIE_NAME, token, cookieOptions);

        res.json({ username: admin.username });

    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({ message: "Something went wrong" });

    }

};

// ==========================================================
// ME — confirms whether the current cookie is a valid session
// (req.admin is attached by the verifyToken middleware)
// ==========================================================
const getCurrentAdmin = (req, res) => {
    res.json({ username: req.admin.username });
};

// ==========================================================
// LOGOUT — clears the cookie
// ==========================================================
const logoutAdmin = (req, res) => {

    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.json({ message: "Logged out" });

};

// ==========================================================
// CHANGE CREDENTIALS (protected — requires a valid session)
// ==========================================================
const changeCredentials = async (req, res) => {

    try {

        const { newUsername, newPassword } = req.body;

        if (!newUsername || !newPassword) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const admin = await Admin.findById(req.admin.id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.username = newUsername;
        admin.password = newPassword; // re-hashed automatically by the pre-save hook

        await admin.save();

        res.json({ message: "Admin credentials updated successfully" });

    } catch (error) {

        console.error("Change Credentials Error:", error);

        res.status(500).json({ message: "Something went wrong" });

    }

};

module.exports = {
    loginAdmin,
    getCurrentAdmin,
    logoutAdmin,
    changeCredentials
};