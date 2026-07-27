import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getMyProjects } from "../../services/projectService";
import { FaGithub } from "react-icons/fa";
import {  ExternalLink, FileText, Plus } from "lucide-react";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getMyProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-[#6B7280]">Loading your projects...</p>
          ) : projects.length === 0 ? (
            <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
              <FileText size={28} className="mx-auto text-[#9CA3AF] mb-3" />
              <p className="text-sm text-[#6B7280] mb-4">You haven't submitted any projects yet.</p>
              <Link
                to="/student/submit"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#F0A868] text-[#1B2340] text-sm font-semibold hover:bg-[#EC9B52] transition"
              >
                Submit your first project
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {projects.map((project) => {
                const status = statusStyles[project.status] || statusStyles.draft;
                return (
                  <div
                    key={project._id}
                    className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/30 transition"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <p className="font-serif text-xl text-[#1B2340]">{project.title}</p>
                        <p className="text-sm text-[#6B7280] mt-1 max-w-xl line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
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