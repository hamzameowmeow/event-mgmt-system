import express from "express";
import { Participation } from "../models/participationModel.js";

const router = express.Router();

// router.post("/", async (request, response) => {
//   try {
//     if (!request.body.eventId || !request.body.participantId) {
//       return response.send("Insufficient fields. Send all fields");
//     }
//     const newParticipation = {
//       eventId: request.body.eventId,
//       participantId: request.body.participantId,
//     };
//     const participation = await Participation.create(newParticipation);
//     return response.send(participation);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/", async (request, response) => {
//   try {
//     const participations = await Participation.find({});
//     return response.send(participations);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/eventId/:eventId", async (request, response) => {
//   try {
//     const { eventId } = request.params;
//     const participation = await Participation.find({ eventId: eventId });
//     return response.send(participation);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/participantId/:participantId", async (request, response) => {
//   try {
//     const { participantId } = request.params;
//     const participation = await Participation.find({
//       participantId: participantId,
//     });
//     return response.send(participation);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.delete("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const participation = await Participation.findByIdAndDelete(id);
//     response.send(participation);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
