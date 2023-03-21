import jwt from "jsonwebtoken";
import { SECRETKEY } from "../global/dotenvs.js";
import createError from "http-errors";

export const authenticate = async (req, res, next) => {
  try {
    // with cookie
    const token = req.cookies.token;

    // with header
    // const token = req.header("auth-token");
    // console.log(req.header)

    if (!token) {
      const error = createError(500, { msg: "no token" });
      next(error);
    }
    const decode = await jwt.verify(token, SECRETKEY);
    if(!decode){
      const error = createError(500,{msg: "token is invalid"})
      next(error)
    }
    
    // wenn als middleware
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    const error = createError(500, { msg: "server error" });
    next(error);
  }
};
