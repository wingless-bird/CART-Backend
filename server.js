const path = require("path");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const authRoutes = require("./routes/authRoutes");

// Connect MongoDB
connectDB();

const app = express();

// ======================
// Middleware
// ======================
// Cross-origin cookies require an explicit origin (not "*") plus credentials: true.
// FRONTEND_URL must be set in the environment to your exact Vercel URL, no trailing slash.
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ======================
// Static Files
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// API Routes
// ======================
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/auth", authRoutes);

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
    res.send("Backend Running...");
});

// ======================
// 404 Route
// ======================
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});