import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8 md:p-14">
      <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
        Admin Dashboard
      </span>
      <h1 className="font-serif text-3xl text-[#1B2340] mt-2">
        Welcome{user?.name ? `, ${user.name}` : ""}
      </h1>
      <p className="text-sm text-[#6B7280] mt-2 max-w-md">
        University-wide stats, user management, and system reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Total projects</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Approved</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Pending</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Registered users</p>
        </div>
      </div>

      
    </div>
  );
};

export default DashBoard;