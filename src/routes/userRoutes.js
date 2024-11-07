import express from "express";
import signup from "../controllers/Signup.js";
import login from "./../controllers/Login.js";
import verifyEmail from "./../controllers/VerifyEmail.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/ForgotPassword.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
