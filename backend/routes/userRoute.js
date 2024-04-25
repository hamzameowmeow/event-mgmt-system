import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// to get all the users
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.send(users);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// to check if username already exists for a role
router.get("/roleAndUsername/:role/:username", async (request, response) => {
  try {
    const { role, username } = request.params;
    const users = await User.findOne({ role: role, username: username });
    return response.send(users);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// to get the details of a user, given their id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    return response.send(user);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

// to add a user to the database
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password ||
      !request.body.username ||
      !request.body.role
    ) {
      return response.send("Insufficient fields. Send all fields");
    }
    const newUser = {
      email: request.body.email,
      name: request.body.name,
      username: request.body.username,
      password: request.body.password,
      role: request.body.role,
    };
    const user = await User.create(newUser);
    return response.send(user);
  } catch (error) {
    console.log(error.message);
    return response.send(error.message);
  }
});

export default router;
