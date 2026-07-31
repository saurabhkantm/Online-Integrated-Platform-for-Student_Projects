import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { getProjectReviews, submitReview } from "../../services/review.Service.js";
import { useAuth } from "../../hooks/useAuth";

const ProjectReviews = ({ projectId, isOwner }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getProjectReviews(projectId);
      setReviews(data.reviews || []);
      setAvgRating(data.avgRating || 0);
      setCount(data.count || 0);
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await submitReview(projectId, { rating, comment });
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <p className="font-serif text-xl text-[#1B2340]">Reviews</p>
        {count > 0 && (
          <span className="flex items-center gap-1 text-sm text-[#6B7280]">
            <Star size={14} className="fill-[#F0A868] text-[#F0A868]" />
            {avgRating} ({count})
          </span>
        )}
      </div>

      {/* Review form — only if logged in and not the project owner */}
      {user && !isOwner && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white border border-[#E2E4EA] mb-6">
          <p className="text-sm font-medium text-[#1B2340] mb-2">Leave a rating</p>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={22}
                  className={
                    star <= (hoverRating || rating)
                      ? "fill-[#F0A868] text-[#F0A868]"
                      : "text-[#E2E4EA]"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts (optional)"
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E2E4EA] text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition resize-none mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] disabled:opacity-50 transition"
          >
            {submitting ? "Submitting..." : "Submit review"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-[#6B7280]">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-[#6B7280]">No reviews yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r._id} className="p-4 rounded-xl bg-white border border-[#E2E4EA]">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-[#1B2340]">{r.user?.name}</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      className={star <= r.rating ? "fill-[#F0A868] text-[#F0A868]" : "text-[#E2E4EA]"}
                    />
                  ))}
                </div>
              </div>
              {r.comment && <p className="text-sm text-[#6B7280]">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectReviews;