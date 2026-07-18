const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
{
    amount: Number,

    items_count: Number,

    items: [
        {
            id: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ]
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:false
    }
});

module.exports = mongoose.model("Sale", saleSchema);