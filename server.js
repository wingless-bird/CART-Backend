const path = require("path");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

// Connect MongoDB
connectDB();

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Static Files
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// API Routes
// ======================
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

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