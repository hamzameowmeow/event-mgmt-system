import express from "express";
import { Event } from "../models/eventModel.js";

const router = express.Router();

// to get all the events
router.get("/", async (request, response) => {
  try {
    const events = await Event.find({});
    return response.send(events);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// to create a new event
router.post("/", async (request, response) => {
  try {
    if (!request.body.name || !request.body.date || !request.body.organizerId) {
      return response.send("Insufficient fields. Send all fields");
    }
    const newEvent = {
      name: request.body.name,
      date: request.body.date,
      organizerId: request.body.organizerId,
      status: "pending",
      comments: [],
      notifications: [],
    };
    const event = await Event.create(newEvent);
    return response.send(event);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// find the events created by an organizer
router.get("/organizerId/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const events = await Event.find({ organizerId: id });
    return response.send(events);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// update event
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const event = await Event.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    return response.send(event);
  } catch (error) {
    console.log(error.message);
    response.send(error.message);
  }
});

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

export default router;
