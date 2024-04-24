import mongoose, { Mongoose } from "mongoose";

const commentSchema = mongoose.Schema({
  moderatorEmail: String,
  time: Date,
  comment: String,
});

const notificationSchema = mongoose.Schema({
  time: Date,
  notification: String,
});

const eventSchema = mongoose.Schema(
  {
    name: String,
    time: Date,
    status: String,
    comments: [commentSchema],
    notifications: [notificationSchema],
    // foreign key
    organizerId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);
