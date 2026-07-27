import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import { getMyProjects } from "../../services/projectService";

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : total}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Total submissions</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : approved}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Approved</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
            <p className="text-3xl font-serif text-[#1B2340]">
              {loading ? "—" : pending}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">Pending review</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            to="/student/submit"
            className="px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
          >
            Submit a project
          </Link>
          <Link
            to="/student/my-project"
            className="px-6 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] text-sm font-medium hover:bg-white transition"
          >
            View my projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;