import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const AddressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: AddressSchema,

});

const saltRound = await bcrypt.genSalt(10);

UserSchema.pre("save", async function (next) {
  console.log("pre save");
  this.password = await bcrypt.hash(this.password, saltRound);
  next();
});

//hide field like password to have more security
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePassword = async (pass, userPass) => {
  return await bcrypt.compare(pass, userPass); // true or false
};

const User = model("User", UserSchema);

export default User;
