import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


export const UserLoginSchema = new mongoose.Schema({

    email: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    }
  });