const Sale = require("../models/Sale");


// ===============================
// GET ALL SALES
// ===============================
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ created_at: -1 });

        res.json(sales);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};


// ===============================
// CREATE SALE
// ===============================
const createSale = async (req, res) => {
    try {

        const sale = await Sale.create({

            amount: req.body.amount,

            items_count: req.body.items_count,

            items: req.body.items || []

        });

        res.status(201).json(sale);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }
};


module.exports = {
    getSales,
    createSale
};