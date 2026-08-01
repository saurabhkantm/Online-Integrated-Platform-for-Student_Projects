import mongoose, { now } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Project Category is required"],
      trim: true,
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    assignedFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    githubLink: {
      type: String,
      default: null,
    },

    liveLink: {
      type: String,
      default: null,
    },

    documentation: {
      type: String,
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    plagiarismScore: {
      type: Number,
      default: 0,
    },
    plagiarismFlagged: {
      type: Boolean,
      default: false,
    }, plagiarismReason: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "draft",
        "pending_review",
        "approved",
        "needs_changes",
        "rejected",
      ],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const projectModel =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default projectModel;