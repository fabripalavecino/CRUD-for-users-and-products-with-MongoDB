const mongoose = require("mongoose");

//const Schema = mongoose.Schema;
const { Schema } = mongoose;
const productsSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Product", productsSchema);

module.exports = model;
