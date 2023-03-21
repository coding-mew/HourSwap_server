import dotenv from "dotenv";
dotenv.config();

//if portfinder used, then PORT is not needed
// const PORT = process.env.PORT;
const URI_URL = process.env.URI_URL;
const SECRETKEY = process.env.SECRETKEY;
const DB = process.env.MONGO_DB;

export { /*PORT,*/ URI_URL, SECRETKEY, DB };
