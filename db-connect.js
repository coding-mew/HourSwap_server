import mongoose from "mongoose";
import { URI_URL, DB } from "./global/dotenvs.js";

mongoose.set("strictQuery", true);


mongoose
  .connect(URI_URL)
  .then(() => {
    console.log(`🐿  Database Connected, you are working on DB: ${DB} `);
  })
  .catch((err) => {
    console.log(err);
  });
