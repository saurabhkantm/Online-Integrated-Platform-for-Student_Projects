import reviewModel from "../model/review.model.js";
import projectModel from "../model/project.model.js";

export async function updateoraddreview(req, res) {
    const { rating, comment } = req.body;

    if (!rating || rating > 5 || rating < 1) {
        return res.status(400).json({
            success: false,
            message: "A rating between 1 and 5 is required.",
        })
    }

    try {
        const project = await projectModel.findOne({
            _id: req.params.id,
            status: "approved"
        })
        if (!project) {
            return res.status(400).json({
                success: false,
                message: "project not found!"
            })
        }

        //prevent creator reviewing their own project
        if (project.createdBy.toString() === req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cant review your own project."
            })
        }

        const review = await reviewModel.findOneAndUpdate(
            { project: project._id, user: req.user._id },
            { rating, comment },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // keep project.averageRating / reviewCount in sync
        await reviewModel.recalculateProjectRating(project._id);

        return res.status(200).json({
            success: true,
            message: "review submitted successfully!",
            review
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e
        })
    }
}

export async function getProjectreviews(req,res) {
    try {
        const reviews = await reviewModel
            .find({ project: req.params.id })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        return res.status(200).json({
            success: true,
            reviews,
            avgRating: Math.round(avgRating * 10) / 10,
            count: reviews.length,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: e
        })
    }
}