import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-6">
        <FileQuestion size={26} className="text-[#1B2340]" />
      </div>

      <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
        404
      </span>
      <h1 className="font-serif text-3xl text-[#1B2340] mt-2 mb-2">
        This page doesn't exist
      </h1>
      <p className="text-sm text-[#6B7280] max-w-sm mb-8">
        The page you're looking for may have been moved, renamed, or never
        existed in the first place.
      </p>

      <div className="flex gap-3">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
        >
          Back to home
        </Link>
        <Link
          to="/browse-project"
          className="px-6 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] text-sm font-medium hover:bg-white transition"
        >
          Browse projects
        </Link>
      </div>
    </div>
  );
};

export default NotFound;