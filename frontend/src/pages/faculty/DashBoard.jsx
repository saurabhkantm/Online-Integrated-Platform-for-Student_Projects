import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar.jsx";
import { getAssignedProjects } from "../../services/ProjectService.js";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : pending}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Pending review</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : approved}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Approved</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : flagged}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Flagged for plagiarism</p>
          </div>
        </div>

        <Link
          to="/faculty/review"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
        >
          Go to review queue
        </Link>
      </div>
    </div>
  );
};

export default FacultyDashboard;