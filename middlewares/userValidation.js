import { body, validationResult } from "express-validator";
import createError from "http-errors";
import { UserSchema } from "../models/UserRegistration.js";
import jwt from 'jsonwebtoken'

const requiredFields = UserSchema.requiredPaths();

const requiredFieldsValidation = requiredFields.map((field) => {
  return body(field).exists().withMessage(`${field} is required`);
});

export const registerValidationRules = [
  ...requiredFieldsValidation,
  body("firstName")
    .isLength({ min: 3 })
    .withMessage(`firstName must be at least 3 characters long`),
    body("lastName")
    .isLength({ min: 3 })
    .withMessage(`lastName must be at least 3 characters long`),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("you have to enter a valid Email !!!"),
  body("password").isString().withMessage("password must be a string"),
   body("city").isString().withMessage("city must be a string"),
   body("street").isString().withMessage("street must be a string"),
   body("postalCode").isNumeric().withMessage("postalCode must be a Number"),

];

export const validate = (req, res, next) => {
try {
  const token = req.cookies.token
  console.log(token)
  const payload = jwt.verify(token, process.env.SECRETKEY)
  console.log("🚀 ~ file: userValidation.js:38 ~ validate ~ payload:", payload)
  req.user = payload
  // res.json(true)
  next()

} catch (error) {
  return res.status(401).json({msg: 'invalid access token'})
}
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // console.log('cookie', req.cookies)
    return next();
  }
  const error = createError(400, { errors: errors.array() });
  console.log(error)
  next(error);
};
