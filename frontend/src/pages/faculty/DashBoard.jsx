import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar.jsx";
import { getAssignedProjects } from "../../services/ProjectService.js";
import {
  Hourglass,
  CheckCircle2,
  ShieldAlert,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAssignedProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load assigned projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const pending = projects.filter((p) => p.status === "pending_review").length;
  const approved = projects.filter((p) => p.status === "approved").length;
  const flagged = projects.filter((p) => p.plagiarismFlagged).length;

  const pendingProjects = projects
    .filter((p) => p.status === "pending_review")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const statCards = [
    { label: "Pending review", value: pending, icon: Hourglass, bg: "bg-[#F0A868]/20", color: "text-[#B9762F]" },
    { label: "Approved", value: approved, icon: CheckCircle2, bg: "bg-green-100", color: "text-green-700" },
    {
      label: "Flagged for plagiarism",
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
          Faculty Dashboard
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-sm text-[#6B7280] mt-2 max-w-md">
          Review pending submissions and manage approvals for your department.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
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

        <Link
          to="/faculty/review"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
        >
          <ClipboardList size={15} />
          Go to review queue
        </Link>

        {/* Pending queue preview */}
        {!loading && pendingProjects.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-[#1B2340] flex items-center gap-2">
                <Hourglass size={18} className="text-[#F0A868]" />
                Awaiting your review
              </h2>
              <Link
                to="/faculty/review"
                className="text-sm text-[#1B2340] font-medium hover:text-[#F0A868] transition flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {pendingProjects.map((project) => (
                <Link
                  key={project._id}
                  to="/faculty/review"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/30 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                    <ClipboardList size={16} className="text-[#1B2340]/40" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#1B2340] truncate">{project.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      By {project.createdBy?.name} · {project.category}
                    </p>
                  </div>
                  {project.plagiarismFlagged && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium shrink-0">
                      <ShieldAlert size={12} />
                      {project.plagiarismScore}%
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && pending === 0 && (
          <div className="mt-10 p-12 text-center rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
            <p className="font-serif text-lg text-[#1B2340] mb-1">You're all caught up</p>
            <p className="text-sm text-[#6B7280]">
              No projects are currently awaiting your review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;