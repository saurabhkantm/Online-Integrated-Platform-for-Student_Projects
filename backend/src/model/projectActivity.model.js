import mongoose from "mongoose";

const projectActivitySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "PROJECT_STARTED",
        "PROJECT_UPDATED",
        "PROJECT_SUBMITTED",
        "PROJECT_APPROVED",
        "PROJECT_REJECTED",
        "CHANGES_REQUESTED",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const projectActivityModel =
  mongoose.models.projectActivity ||
  mongoose.model("projectActivity", projectActivitySchema);

export default projectActivityModel;
