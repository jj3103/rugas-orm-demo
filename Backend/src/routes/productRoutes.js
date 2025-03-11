import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);
router.get("/getproduct", getAllProducts);
router.get("/getbyid/:id", getProductById);
router.put("/update/:id", auth, updateProduct);
router.delete("/delete/:id", auth, deleteProduct);

export default router;
