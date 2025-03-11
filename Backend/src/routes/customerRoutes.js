import express from "express";
import auth from "../middlewares/auth.js";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/createCustomer", auth, createCustomer);
router.get("/getCustomer", auth, getAllCustomers);
router.get("/:id", auth, getCustomerById);
router.put("/update/:id", auth, updateCustomer);
router.delete("/delete/:id", auth, deleteCustomer);

export default router;
