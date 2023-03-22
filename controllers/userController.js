import { validationResult } from "express-validator";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/UserRegistration.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, city, street, postalCode, profilePicture } =
    req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = createError(409, "user already exists!");
      next(error);
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      address: {
        city,
        street,
        postalCode,
      },
    });
    await user.save();
    const userWithoutPassword = user.toJSON();
    console.log(userWithoutPassword);
    return res
      .status(201)
      .json({ msg: "User created Successfully!", userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log("login", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = createError(404, "email not found!");
      return next(error);
    }
    const matched = await user.comparePassword(password, user.password);
    if (!matched) {
      const error = createError(401, "Incorrect email or password");
  return next(error);
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
    });
    const userWithoutPassword = user.toJSON();
    res
      .status(200)
      .json({ msg: "you are logged in", user: userWithoutPassword });

  } catch (error) {
    // const errorMessage= createError(500, { msg: "Server Error!" });
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ allUsers });
    // console.log("allUsers:", allUsers);
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:89 ~ getAllUsers ~ error:",
      error
    );
    next(createError(500, { msg: "Server Error!" }));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({ user });
  } catch (error) {
    next(createError(404, "User not found"));
  }
};

export const deleteUser = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return createError(400, { errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return createError(404, "User not found");
    }
    res.status(200).json({ user });
    console.log("user deleted");
  } catch (error) {
    console.log(
      "🚀 ~ file: userController.js:128 ~ deleteUser ~ error:",
      error
    );
    next(createError(500, "Server Error"));
  }
};
