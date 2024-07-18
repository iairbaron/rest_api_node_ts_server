import { Request, Response } from "express";
import Product from "../model/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);

    res.json({ data: product });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const product = await Product.findAll({
      order: [["price", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json({ data: product });
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: "Product Does not exist",
      });
    }
    res.json({ data: product });
  } catch (err) {
    console.log(err);
  }
};

//El put va a remplazar todo el objeto  con lo que enviemos. Es decir que si en el req.body le envio solo name,
//va a quedar solo el name y los oTROS dos atributos se eliminan.
//No me sucedio probando pero bueno eso dice el profe jeje
export const updateProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: "Product Does not exist",
      });
    }

    await product.update(req.body);

    product.save();

    res.json({ data: product });
  } catch (err) {
    console.log(err);
  }
};

//Patch.
export const updateAvailability = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: "Product Does not exist",
      });
    }

    product.availability = !product.dataValues.availability;

    product.save();

    res.json({ data: product });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: "Product Does not exist",
      });
    }
    await product.destroy();

    res.json({ data: "product successfully removed" });
  } catch (err) {
    console.log(err);
  }
};
