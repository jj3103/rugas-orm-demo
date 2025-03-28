import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);

export default router;
