import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for organization"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Code is required for organization"],
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const organizationModel =
  mongoose.models.organization ||
  mongoose.model("organization", organizationSchema);

export default organizationModel;
