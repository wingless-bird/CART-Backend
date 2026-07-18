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

// GET ALL PRODUCTS
router.get("/", getProducts);

// CREATE PRODUCT WITH IMAGE
router.post("/", upload.single("image"), createProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;