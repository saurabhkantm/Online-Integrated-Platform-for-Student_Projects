import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getMyProjects, deleteProject } from "../../services/ProjectService.js";
import ProjectTimeline from "../../components/projects/ProjectTimeline";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, FileText, Plus, Pencil, Trash2, ChevronDown, ShieldAlert } from "lucide-react";

const statusStyles = {
  draft: { label: "Draft", bg: "bg-[#E2E4EA]", text: "text-[#4A5568]" },
  pending_review: { label: "Pending Review", bg: "bg-[#F0A868]/20", text: "text-[#B9762F]" },
  approved: { label: "Approved", bg: "bg-green-100", text: "text-green-700" },
  needs_changes: { label: "Needs Changes", bg: "bg-blue-100", text: "text-blue-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
};

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState("submitted"); 
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getMyProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this draft project? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  const drafts = projects.filter((p) => p.status === "draft");
  const submitted = projects.filter((p) => p.status !== "draft");
  const visibleProjects = activeTab === "drafts" ? drafts : submitted;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
              Your submissions
            </span>
            <h1 className="font-serif text-3xl text-[#1B2340] mt-2">My Projects</h1>
          </div>

          <Link
            to="/student/submit"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
          >
            <Plus size={16} />
            Submit a project
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-8 mb-6 border-b border-[#E2E4EA]">
          <button
            onClick={() => setActiveTab("submitted")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === "submitted"
                ? "border-[#1B2340] text-[#1B2340]"
                : "border-transparent text-[#9CA3AF] hover:text-[#4A5568]"
            }`}
          >
            Submitted ({submitted.length})
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === "drafts"
                ? "border-[#1B2340] text-[#1B2340]"
                : "border-transparent text-[#9CA3AF] hover:text-[#4A5568]"
            }`}
          >
            Drafts ({drafts.length})
          </button>
        </div>

        <div>
          {loading ? (
            <p className="text-sm text-[#6B7280]">Loading your projects...</p>
          ) : visibleProjects.length === 0 ? (
            <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
              <FileText size={28} className="mx-auto text-[#9CA3AF] mb-3" />
              <p className="text-sm text-[#6B7280] mb-4">
                {activeTab === "drafts"
                  ? "No drafts saved."
                  : "You haven't submitted any projects yet."}
              </p>
              <Link
                to="/student/submit"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#F0A868] text-[#1B2340] text-sm font-semibold hover:bg-[#EC9B52] transition"
              >
                {activeTab === "drafts" ? "Create a draft" : "Submit your first project"}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {visibleProjects.map((project) => {
                const status = statusStyles[project.status] || statusStyles.draft;
                const isDraft = project.status === "draft";
                const isExpanded = expandedId === project._id;

                return (
                  <div
                    key={project._id}
                    className={`rounded-xl bg-white border overflow-hidden transition ${
                      project.plagiarismFlagged ? "border-red-200" : "border-[#E2E4EA]"
                    } hover:border-[#1B2340]/30`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <p className="font-serif text-xl text-[#1B2340]">{project.title}</p>
                          <p className="text-sm text-[#6B7280] mt-1 max-w-xl line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {project.plagiarismScore != null && (
                            <span
                              className={`flex items-center cursor-pointer gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                                project.plagiarismFlagged
                                  ? "bg-red-50 text-red-600"
                                  : "bg-green-50 text-green-700"
                              }`}
                              title={project.plagiarismReason || "No significant similarity found"}
                            >
                              <ShieldAlert size={12} />
                              {project.plagiarismAverageScore}% match
                            </span>
                          )}

                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>

                          {isDraft && (
                            <>
                              <button
                                onClick={() => navigate(`/student/projects/${project._id}/edit`)}
                                className="p-2 rounded-lg border border-[#E2E4EA] text-[#4A5568] hover:border-[#1B2340] hover:text-[#1B2340] transition"
                                title="Edit draft"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => handleDelete(project._id)}
                                disabled={deletingId === project._id}
                                className="p-2 rounded-lg border border-[#E2E4EA] text-red-500 hover:border-red-400 hover:bg-red-50 disabled:opacity-50 transition"
                                title="Delete draft"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : project._id)}
                            className="p-2 rounded-lg border border-[#E2E4EA] text-[#4A5568] hover:border-[#1B2340] hover:text-[#1B2340] transition"
                            title="Toggle timeline"
                          >
                            <ChevronDown
                              size={15}
                              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm text-[#6B7280]">
                        {project.assignedFaculty?.name && (
                          <span>Reviewer: {project.assignedFaculty.name}</span>
                        )}
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

                      {project.feedback && (
                        <div className="mt-4 p-3 rounded-lg bg-[#F7F5F0] border border-[#E2E4EA]">
                          <p className="text-xs text-[#6B7280] font-medium mb-1">Faculty feedback</p>
                          <p className="text-sm text-[#4A5568]">{project.feedback}</p>
                        </div>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-[#E2E4EA] pt-4 animate-fade-in-up">
                        <ProjectTimeline projectId={project._id} />
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

export default MyProjects;