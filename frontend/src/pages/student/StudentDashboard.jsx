import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import { getMyProjects } from "../../services/ProjectService.js";
import {
  ShieldAlert,
  Compass,
  Trophy,
  Clock,
  FileText,
  CheckCircle2,
  Hourglass,
  Plus,
} from "lucide-react";

const statusStyles = {
  draft: { label: "Draft", bg: "bg-[#E2E4EA]", text: "text-[#4A5568]" },
  pending_review: { label: "Pending Review", bg: "bg-[#F0A868]/20", text: "text-[#B9762F]" },
  approved: { label: "Approved", bg: "bg-green-100", text: "text-green-700" },
  needs_changes: { label: "Needs Changes", bg: "bg-blue-100", text: "text-blue-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
};

const StudentDashboard = () => {
  const { user } = useAuth();
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

  const total = projects.length;
  const approved = projects.filter((p) => p.status === "approved").length;
  const pending = projects.filter((p) => p.status === "pending_review").length;
  const flagged = projects.filter((p) => p.plagiarismFlagged).length;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  const statCards = [
    { label: "Total submissions", value: total, icon: FileText, bg: "bg-[#1B2340]/10", color: "text-[#1B2340]" },
    { label: "Approved", value: approved, icon: CheckCircle2, bg: "bg-green-100", color: "text-green-700" },
    { label: "Pending review", value: pending, icon: Hourglass, bg: "bg-[#F0A868]/20", color: "text-[#B9762F]" },
    {
      label: "Plagiarism flags",
      value: flagged,
      icon: ShieldAlert,
      bg: flagged > 0 ? "bg-red-100" : "bg-[#1B2340]/10",
      color: flagged > 0 ? "text-red-600" : "text-[#1B2340]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Student Dashboard
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-sm text-[#6B7280] mt-2 max-w-md">
          Submit new projects, track review status, and browse work from other
          colleges — all from here.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {statCards.map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className="flex items-center gap-4 p-6 rounded-xl bg-white border border-[#E2E4EA]">
              <div className={`w-11 h-11 flex items-center justify-center rounded-full shrink-0 ${bg}`}>
                <Icon size={19} className={color} />
              </div>
              <div>
                <p className="text-2xl font-serif text-[#1B2340]">{loading ? "—" : value}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            to="/student/submit"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
          >
            <Plus size={15} />
            Submit a project
          </Link>
          <Link
            to="/student/my-project"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] text-sm font-medium hover:bg-white transition"
          >
            <FileText size={15} />
            View my projects
          </Link>
          <Link
            to="/browse-project"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E2E4EA] text-[#4A5568] text-sm font-medium hover:border-[#1B2340] hover:text-[#1B2340] transition"
          >
            <Compass size={15} />
            Browse projects
          </Link>
          <Link
            to="/leaderboard"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E2E4EA] text-[#4A5568] text-sm font-medium hover:border-[#1B2340] hover:text-[#1B2340] transition"
          >
            <Trophy size={15} />
            Leaderboard
          </Link>
        </div>

        {/* Recent activity */}
        {!loading && recentProjects.length > 0 && (
          <div className="mt-10">
            <h2 className="font-serif text-xl text-[#1B2340] mb-4 flex items-center gap-2">
              <Clock size={18} className="text-[#F0A868]" />
              Recent activity
            </h2>
            <div className="flex flex-col gap-3">
              {recentProjects.map((project) => {
                const status = statusStyles[project.status] || statusStyles.draft;
                return (
                  <Link
                    key={project._id}
                    to="/student/my-project"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/30 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-[#1B2340]/40" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#1B2340] truncate">{project.title}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Updated {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.plagiarismFlagged && (
                        <ShieldAlert size={14} className="text-red-500" />
                      )}
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && total === 0 && (
          <div className="mt-10 p-12 text-center rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1B2340]/5 flex items-center justify-center mb-4">
              <FileText size={24} className="text-[#9CA3AF]" />
            </div>
            <p className="font-serif text-lg text-[#1B2340] mb-1">No projects yet</p>
            <p className="text-sm text-[#6B7280] mb-5">
              Get started by submitting your first project for review.
            </p>
            <Link
              to="/student/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F0A868] text-[#1B2340] text-sm font-semibold hover:bg-[#EC9B52] transition"
            >
              <Plus size={15} />
              Submit a project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;