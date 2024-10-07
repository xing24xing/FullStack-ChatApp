import express from 'express';
import { getOtherUsers, login, logout, register } from '../controllers/userContoller.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

// User Registration, Login, Logout Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Fetch other users (without the logged-in user)
router.route("/").get(isAuth, getOtherUsers);

export default router;
