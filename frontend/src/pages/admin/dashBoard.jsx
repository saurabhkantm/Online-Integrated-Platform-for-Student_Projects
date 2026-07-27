import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import { Users, Building2, FileBarChart } from "lucide-react";

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14" >
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Admin Dashboard
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-sm text-[#6B7280] mt-2 max-w-md">
          University-wide stats, user management, and system reports.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          <div className="p-6 rounded-xl bg-white border border-[#F0A868]">
            <p className="text-3xl font-serif text-[#1B2340]">0</p>
            <p className="text-sm text-[#6B7280] mt-1">Total projects</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#F0A868]">
            <p className="text-3xl font-serif text-[#1B2340]">0</p>
            <p className="text-sm text-[#6B7280] mt-1">Approved</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#F0A868]">
            <p className="text-3xl font-serif text-[#1B2340]">0</p>
            <p className="text-sm text-[#6B7280] mt-1">Pending</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-[#F0A868]">
            <p className="text-3xl font-serif text-[#1B2340]">0</p>
            <p className="text-sm text-[#6B7280] mt-1">Registered users</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-10">
          <h2 className="font-serif text-xl text-[#1B2340] mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              to="/admin/users"
              className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-3">
                <Users size={18} className="text-[#1B2340]" />
              </div>
              <p className="font-serif text-lg mb-1">Manage Users</p>
              <p className="text-sm text-[#6B7280]">View, deactivate, or promote accounts.</p>
            </Link>

            <Link
              to="/admin/colleges"
              className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-3">
                <Building2 size={18} className="text-[#1B2340]" />
              </div>
              <p className="font-serif text-lg mb-1">Manage Colleges</p>
              <p className="text-sm text-[#6B7280]">Add or edit registered institutions.</p>
            </Link>

            <Link
              to="/admin/reports"
              className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-3">
                <FileBarChart size={18} className="text-[#1B2340]" />
              </div>
              <p className="font-serif text-lg mb-1">System Reports</p>
              <p className="text-sm text-[#6B7280]">Export stats and activity summaries.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;