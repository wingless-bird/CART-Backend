const Product = require("../models/Product");

// ===============================
// GET ALL PRODUCTS
// ===============================
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ created_at: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ===============================
// CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const grossAmount = Number(req.body.grossAmount ?? req.body.price ?? 0);
        const discount = Number(req.body.discount ?? 0);
        const netAmount = req.body.netAmount != null
            ? Number(req.body.netAmount)
            : grossAmount - (grossAmount * discount) / 100;

        const product = await Product.create({
            name: req.body.name,
            category: req.body.category,
            grossAmount,
            discount,
            netAmount,
            price: netAmount,
            image_url: req.file ? `/uploads/${req.file.filename}` : ""
        });

        res.status(201).json(product);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

// ===============================
// UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {
    try {

        const updates = { ...req.body };

        // recompute net amount server-side whenever gross/discount change,
        // so a bad/missing netAmount from the client can never desync
        if (updates.grossAmount != null || updates.discount != null) {
            const gross = Number(updates.grossAmount ?? 0);
            const discount = Number(updates.discount ?? 0);
            const net = gross - (gross * discount) / 100;

            updates.grossAmount = gross;
            updates.discount = discount;
            updates.netAmount = net;
            updates.price = net;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true
            }
        );

        res.json(updatedProduct);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// ===============================
// DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};