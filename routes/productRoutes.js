const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

// ===============================
// Multer Storage Configuration
// ===============================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    }
});

const upload = multer({
    storage
});

// ===============================
// Routes
// ===============================

// GET ALL PRODUCTS (public — storefront needs this)
router.get("/", getProducts);

// CREATE PRODUCT WITH IMAGE (admin only)
router.post("/", verifyToken, upload.single("image"), createProduct);

// UPDATE PRODUCT (admin only)
router.put("/:id", verifyToken, updateProduct);

// DELETE PRODUCT (admin only)
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;