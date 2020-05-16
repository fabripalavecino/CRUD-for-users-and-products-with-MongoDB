const Products = require("../../mongo/models/products");

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Product.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: "OK", data: product });
  } catch (e) {
    console.log("createProduct error: ", e);
    res.status(500).send({ status: "ERROR", data: e.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ price: { $gt: 20 } })
      .populate("user", "userName email data role")
      .select("title desc price");
    res.send({ status: "OK", data: products });
  } catch (error) {
    console.log("getProducts error: ", e);
    res.status(500).send({ status: "ERROR", data: e.message });
  }
};

const getProductByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId,
    });
    res.send({ status: "OK", data: products });
  } catch (error) {
    console.log("getProducts error: ", e);
    res.status(500).send({ status: "ERROR", data: e.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductByUser,
};
