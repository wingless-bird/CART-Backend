const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    grossAmount: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    netAmount: {
      type: Number,
      required: true,
    },

    // kept for backward compatibility with any code still reading item.price
    // (StoreHome cart, sales history, etc.) — always mirrors netAmount
    price: {
      type: Number,
      required: true,
    },

    image_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },

    toJSON: {
      virtuals: true,
      versionKey: false,

      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Product", productSchema);
