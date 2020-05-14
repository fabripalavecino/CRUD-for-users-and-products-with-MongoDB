const mongoose = require("mongoose");

//const Schema = mongoose.Schema;
const [Schema] = mongoose;
const productsSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true }
},{
    timestamps: true
});


const model = mongoose.model("produc", productsSchema);

module.exports = model;