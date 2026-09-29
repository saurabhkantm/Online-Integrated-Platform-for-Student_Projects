import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ project: 1, user: 1 }, { unique: true });

reviewSchema.statics.recalculateProjectRating = async function (projectId) {
  const stats = await this.aggregate([
    { $match: { project: projectId } },
    {
      $group: {
        _id: "$project",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const Project = mongoose.model("project");

  if (stats.length > 0) {
    await Project.findByIdAndUpdate(projectId, {
      averageRating: stats[0].averageRating,
      reviewCount: stats[0].reviewCount,
    });
  } else {
    await Project.findByIdAndUpdate(projectId, {
      averageRating: 0,
      reviewCount: 0,
    });
  }
};

const reviewModel =
  mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;