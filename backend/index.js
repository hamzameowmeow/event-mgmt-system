import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import participationRoute from "./routes/participationRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRoute);
app.use("/events", eventRoute);
app.use("/participation", participationRoute);

app.get("/", (request, response) => {
  console.log(request);
  response.send("hello world!");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
