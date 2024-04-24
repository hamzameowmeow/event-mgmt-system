import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// router.post("/", async (request, response) => {
//   try {
//     if (
//       !request.body.name ||
//       !request.body.email ||
//       !request.body.password ||
//       !request.body.role
//     ) {
//       return response.send("Insufficient fields. Send all fields");
//     }
//     const newUser = {
//       email: request.body.email,
//       name: request.body.name,
//       password: request.body.password,
//       role: request.body.role,
//     };
//     const user = await User.create(newUser);
//     return response.send(user);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/", async (request, response) => {
//   try {
//     const users = await User.find({});
//     return response.send(users);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const user = await User.findById(id);
//     return response.send(user);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

// router.get("/:email/:role", async (request, response) => {
//   try {
//     const { email, role } = request.params;
//     const user = await User.findOne({ email: email, role: role });
//     return response.send(user);
//   } catch (error) {
//     console.log(error.message);
//     return response.send(error.message);
//   }
// });

export default router;
