import { useState, useEffect } from "react";
import { getProjectTimeline, addProjectUpdate } from "../../services/ProjectService.js";
import { Send } from "lucide-react";

const actionLabels = {
  PROJECT_STARTED: "Project started",
  PROJECT_UPDATED: "Update posted",
  PROJECT_SUBMITTED: "Submitted for review",
  PROJECT_APPROVED: "Approved",
  PROJECT_REJECTED: "Rejected",
  CHANGES_REQUESTED: "Changes requested",
};

const ProjectTimeline = ({ projectId }) => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchTimeline = async () => {
    try {
      const data = await getProjectTimeline(projectId);
      setTimeline(data || []);
    } catch (err) {
      console.error("Failed to load timeline", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [projectId]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setError("");
    setPosting(true);
    try {
      await addProjectUpdate(projectId, message.trim());
      setMessage("");
      fetchTimeline();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post update.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-[#1B2340] mb-3">Activity timeline</p>

      <form onSubmit={handlePost} className="flex gap-2 mb-5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Post a progress update..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
        />
        <button
          type="submit"
          disabled={posting || !message.trim()}
          className="px-4 rounded-lg bg-[#1B2340] text-[#F7F5F0] hover:bg-[#232B4D] disabled:opacity-50 transition"
        >
          <Send size={16} />
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100 mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-[#6B7280]">Loading timeline...</p>
      ) : timeline.length === 0 ? (
        <p className="text-sm text-[#6B7280]">No activity yet.</p>
      ) : (
        <div className="flex flex-col gap-3 border-l-2 border-[#E2E4EA] pl-4">
          {timeline.map((entry) => (
            <div key={entry._id} className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#F0A868]" />
              <p className="text-sm text-[#1B2340] font-medium">
                {actionLabels[entry.action] || entry.action}
              </p>
              <p className="text-sm text-[#6B7280] mt-0.5">{entry.message}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">
                {entry.user?.name} · {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;