import mongoose from "mongoose";

const participationSchema = mongoose.Schema(
  {
    eventId: mongoose.ObjectId,
    participantId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

export const Participation = mongoose.model(
  "Participation",
  participationSchema
);
