import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import portfinder from "portfinder";
import "./db-connect.js";
import { logRoutesData } from "./routes-data-logs.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
//  NPM RUN DEV TRUE For logging routes
const app = express();
app.use(express.json());
// app.use(cors({
//   origin: "*"
// }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/user", userRoute);
app.use("/tasks", taskRoute);


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error,
    status: error.status || 500,
  });
});

portfinder.getPort((err, PORT) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(PORT, () => logRoutesData(PORT, app));
});

// app.listen(8003)