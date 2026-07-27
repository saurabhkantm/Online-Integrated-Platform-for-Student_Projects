import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8 md:p-14">
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
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Pending review</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
          <p className="text-sm text-[#6B7280] mt-1">Approved</p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-[#E2E4EA]">
          <p className="text-3xl font-serif text-[#1B2340]">0</p>
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
  );
};

export default dashboard;