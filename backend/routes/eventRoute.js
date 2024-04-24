import express from "express";
import { Event } from "../models/eventModel.js";

const router = express.Router();

// router.post("/", async (request, response) => {
//   try {
//     if (
//       !request.body.name ||
//       !request.body.time ||
//       !request.body.status ||
//       !request.body.organizerEmail
//     ) {
//       return response.send("Insufficient fields. Send all fields");
//     }
//     const newEvent = {
//       name: request.body.name,
//       time: request.body.time,
//       status: request.body.status,
//       organizerEmail: request.body.organizerEmail,
//     };
//     const event = await Event.create(newEvent);
//     return response.send(event);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/", async (request, response) => {
//   try {
//     const events = await Event.find({});
//     return response.send(events);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const event = await Event.findById(id);
//     return response.send(event);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/organizerEmail/:email", async (request, response) => {
//   try {
//     let { email } = request.params;
//     // email has special characters such as @, which need to be decoded
//     email = decodeURI(email);
//     const events = await Event.find({ organizerEmail: email });
//     return response.send(events);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.put("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const event = await Event.findByIdAndUpdate(id, request.body, {
//       new: true,
//     });
//     return response.send(event);
//   } catch (error) {
//     console.log(error.message);
//     response.send(error.message);
//   }
// });

export default router;
