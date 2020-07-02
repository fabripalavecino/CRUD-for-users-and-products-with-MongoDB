import { Request, Response } from "express";
import Products from "../../mongo/models/products";

const createProduct = async (req:Request, res:Response): Promise<void> => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });
    res.send({ status: "OK", data: product });
  } catch (error) {
    console.log("createProduct error: ", error);
    res.status(500).send({ status: "ERROR", data: error.message });
  }
};

//const deleteProduct = (req:Request, res:Response) => {};

const getProducts = async (req:Request, res:Response): Promise<void> => {
  try {
    const products = await Products.find({ price: { $gt: 20 } })
      .populate("user", "userName email data role")
      .select("title desc price");
    res.send({ status: "OK", data: products });
  } catch (error) {
    console.log("getProducts error: ", error);
    res.status(500).send({ status: "ERROR", data: error.message });
  }
};

const getProductByUser = async (req:Request, res:Response): Promise<void> => {
  try {
    const products = await Products.find({
      user: req.params.userId,
    });
    res.send({ status: "OK", data: products });
  } catch (error) {
    console.log("getProducts error: ", error);
    res.status(500).send({ status: "ERROR", data: error.message });
  }
};

export default {
  createProduct,
  //deleteProduct,
  getProducts,
  getProductByUser,
};
