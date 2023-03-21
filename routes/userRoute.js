import express from "express";
import {
  registerValidationRules,
  validate,
} from "../middlewares/userValidation.js";
import { loginValidationRules } from "../middlewares/userLoginValidation.js";
// import { isAdmin } from "../middlewares/roleAuth.js";
import { authenticate } from "../middlewares/authenticate.js";
import { param } from "express-validator";
// import { authenticateToken } from "../controllers/authenticateToken.js";

import {
  register,
  login,
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateToken } from "../controllers/validateToken.js";
const router = express.Router();

router.post("/register", registerValidationRules, register);
router.post("/login", loginValidationRules, login);
router.get("/validate", validateToken)
router.get("/all", authenticate, validate, getAllUsers);
router.get(
  "/one/:id",
  param("id").isMongoId().withMessage("the Id is invalid 😠 "),
  getUser
);
// checken ob token, wenn kein token:error
// router.post("/tokenValid", authenticateToken);
router.delete(
  "/delete-one/:id",
  param("id").isMongoId().withMessage("the Id is invalid 😠 "),
  deleteUser
);

export default router;
