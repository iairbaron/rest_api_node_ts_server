import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.get(
  `/:id`,
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  body("name").notEmpty().withMessage("product name cannot be empty"),
  body("price")
    .isNumeric()
    .custom((value) => value > 0 || value == null)
    .withMessage("Price not valid")
    .notEmpty()
    .withMessage("product name cannot be empty"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  body("price")
    .isNumeric()
    .custom((value) => value > 0 || value == null)
    .withMessage("Price not valid")
    .notEmpty()
    .withMessage("product name cannot be empty"),
  handleInputErrors,
  updateProduct
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID not valid"),
  handleInputErrors,
  deleteProduct
);

export default router;
