import { body, validationResult } from "express-validator";
import createError from "http-errors";
import { UserSchema } from "../models/UserRegistration.js";

const requiredFields = UserSchema.requiredPaths();

const requiredFieldsValidation = requiredFields.map((field) => {
  return body(field).exists().withMessage(`${field} is required`);
});

export const loginValidationRules = [
  ...requiredFieldsValidation,
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("you have to enter a valid Email !!!"),
  body("password").isString().withMessage("password must be a stirng"),
];

