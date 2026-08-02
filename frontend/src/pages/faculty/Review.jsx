import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { getAssignedProjects, reviewProject } from "../../services/ProjectService.js";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, FileText, ChevronDown, Check, X, AlertCircle, ShieldAlert } from "lucide-react";

const statusStyles = {
  pending_review: { label: "Pending Review", bg: "bg-[#F0A868]/20", text: "text-[#B9762F]" },
  approved: { label: "Approved", bg: "bg-green-100", text: "text-green-700" },
  needs_changes: { label: "Needs Changes", bg: "bg-blue-100", text: "text-blue-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
};

const ReviewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submittingAction, setSubmittingAction] = useState(null);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getAssignedProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Failed to load assigned projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleReview = async (id, status) => {
    setError("");
    setSubmittingAction(status);
    try {
      await reviewProject(id, { status, feedback });
      setFeedback("");
      setExpandedId(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review. Try again.");
    } finally {
      setSubmittingAction(null);
    }
  };

  const pendingCount = projects.filter((p) => p.status === "pending_review").length;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Faculty
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">Review Queue</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          {pendingCount > 0
            ? `${pendingCount} project${pendingCount > 1 ? "s" : ""} awaiting your review.`
            : "You're all caught up."}
        </p>

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-[#6B7280]">Loading assigned projects...</p>
          ) : projects.length === 0 ? (
            <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
              <FileText size={28} className="mx-auto text-[#9CA3AF] mb-3" />
              <p className="text-sm text-[#6B7280]">No projects assigned to you yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {projects.map((project) => {
                const status = statusStyles[project.status] || statusStyles.pending_review;
                const isExpanded = expandedId === project._id;
                const isPending = project.status === "pending_review";

                return (
                  <div
                    key={project._id}
                    className={`rounded-xl bg-white border overflow-hidden transition ${project.plagiarismFlagged ? "border-red-200" : "border-[#E2E4EA]"
                      }`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project._id)}
                      className="w-full text-left p-6 flex items-start justify-between flex-wrap gap-3"
                    >
                      <div>
                        <p className="font-serif text-xl text-[#1B2340]">{project.title}</p>
                        <p className="text-sm text-[#6B7280] mt-1">
                          By {project.createdBy?.name} · {project.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.plagiarismAverageScore
                          != null && (
                            <span
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${project.plagiarismFlagged
                                  ? "bg-red-50 text-red-600"
                                  : "bg-green-50 text-green-700"
                                }`}
                            >
                              <ShieldAlert size={12} />
                              {project.plagiarismAverageScore
                              }% match
                            </span>
                          )}
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-[#9CA3AF] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-[#E2E4EA] pt-4 animate-fade-in-up">
                        <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack?.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mb-5 text-sm text-[#6B7280]">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-[#1B2340] transition"
                            >
                              <FaGithub size={14} />
                              Repo
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-[#1B2340] transition"
                            >
                              <ExternalLink size={14} />
                              Live demo
                            </a>
                          )}
                        </div>

                        {/* Plagiarism detail panel */}
                        {project.plagiarismScore != null && (
                          <div
                            className={`p-4 rounded-lg border mb-5 ${project.plagiarismFlagged
                                ? "bg-red-50 border-red-100"
                                : "bg-green-50 border-green-100"
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <ShieldAlert
                                size={15}
                                className={project.plagiarismFlagged ? "text-red-600" : "text-green-700"}
                              />
                              <p className={`text-sm font-semibold ${project.plagiarismFlagged ? "text-red-700" : "text-green-800"
                                }`}>
                                {project.plagiarismFlagged
                                  ? `Flagged — ${project.plagiarismAverageScore
                                  }% similarity to existing work`
                                  : `Looks original — ${project.plagiarismAverageScore
                                  }% highest similarity found`}
                              </p>
                            </div>
                            {project.plagiarismReason && (
                              <p className="text-sm text-[#4A5568] ml-6">{project.plagiarismReason}</p>
                            )}
                            {project.plagiarismAverageScore != null && (
                              <p className="text-xs text-[#6B7280] ml-6 mt-1">
                                Average similarity across all comparisons: {project.plagiarismAverageScore}%
                              </p>
                            )}
                          </div>
                        )}

                        {isPending ? (
                          <>
                            <textarea
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Add feedback (optional for approval, recommended for rejections)"
                              rows={3}
                              className="w-full px-4 py-3 rounded-lg border border-[#E2E4EA] text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition resize-none mb-4"
                            />

                            {error && (
                              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100 mb-4">
                                {error}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-3">
                              <button
                                onClick={() => handleReview(project._id, "approved")}
                                disabled={submittingAction !== null}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
                              >
                                <Check size={16} />
                                {submittingAction === "approved" ? "Approving..." : "Approve"}
                              </button>
                              <button
                                onClick={() => handleReview(project._id, "needs_changes")}
                                disabled={submittingAction !== null}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
                              >
                                <AlertCircle size={16} />
                                {submittingAction === "needs_changes" ? "Sending..." : "Request Changes"}
                              </button>
                              <button
                                onClick={() => handleReview(project._id, "rejected")}
                                disabled={submittingAction !== null}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition"
                              >
                                <X size={16} />
                                {submittingAction === "rejected" ? "Rejecting..." : "Reject"}
                              </button>
                            </div>
                          </>
                        ) : (
                          project.feedback && (
                            <div className="p-3 rounded-lg bg-[#F7F5F0] border border-[#E2E4EA]">
                              <p className="text-xs text-[#6B7280] font-medium mb-1">Your feedback</p>
                              <p className="text-sm text-[#4A5568]">{project.feedback}</p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewProjects;