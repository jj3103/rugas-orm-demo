import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  searchOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/get", getAllOrders);
router.get("/getbyid/:id", auth, getOrderById);
router.patch("/updatestatus/:id", auth, updateOrderStatus);
router.get("/search", searchOrder);

export default router;
