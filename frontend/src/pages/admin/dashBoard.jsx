import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar.jsx";
import {
  Users,
  Building2,
  FileBarChart,
  FolderKanban,
  CheckCircle2,
  Clock,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";

const STATS = [
  { label: "Total projects", value: 0, icon: FolderKanban, tint: "bg-[#4C7CF0]/10", ink: "text-[#4C7CF0]" },
  { label: "Approved", value: 0, icon: CheckCircle2, tint: "bg-emerald-500/10", ink: "text-emerald-600" },
  { label: "Pending", value: 0, icon: Clock, tint: "bg-[#F0A868]/20", ink: "text-[#B76E2A]" },
  { label: "Registered users", value: 0, icon: UserCheck, tint: "bg-[#8B7CF0]/15", ink: "text-[#8B7CF0]" },
];

const ACTIONS = [
  {
    to: "/admin/users",
    icon: Users,
    title: "Manage users",
    desc: "View, deactivate, or promote accounts.",
    tint: "bg-[#1B2340]/5",
    ink: "text-[#1B2340]",
  },
  {
    to: "/admin/colleges",
    icon: Building2,
    title: "Manage colleges",
    desc: "Add or edit registered institutions.",
    tint: "bg-[#4C7CF0]/10",
    ink: "text-[#4C7CF0]",
  },
  {
    to: "/admin/reports",
    icon: FileBarChart,
    title: "System reports",
    desc: "Export stats and activity summaries.",
    tint: "bg-[#8B7CF0]/15",
    ink: "text-[#8B7CF0]",
  },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-32 pl-14 pr-14 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
                Admin Dashboard
              </span>
            </div>
            <h1 className="font-serif text-3xl text-[#1B2340]">
              {getGreeting()}{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-sm text-[#6B7280] mt-2 max-w-md">
              University-wide stats, user management, and system reports.
            </p>
          </div>

          {user?.name && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[#E2E4EA] w-fit">
              <span className="w-9 h-9 rounded-full bg-[#1B2340] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="leading-tight">
                <p className="text-xs font-medium text-[#1B2340]">{user.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">Administrator</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map(({ label, value, icon: Icon, tint, ink }) => (
            <div
              key={label}
              className="p-6 rounded-2xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/15 hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${tint} mb-4`}>
                <Icon size={17} className={ink} />
              </div>
              <p className="text-3xl font-serif text-[#1B2340] leading-none">{value}</p>
              <p className="text-sm text-[#6B7280] mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-[#1B2340]">Quick actions</h2>
            <span className="text-xs text-[#9CA3AF]">{ACTIONS.length} shortcuts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACTIONS.map(({ to, icon: Icon, title, desc, tint, ink }) => (
              <Link
                key={to}
                to={to}
                className="group relative p-6 rounded-2xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <ArrowUpRight
                  size={16}
                  className="absolute top-6 right-6 text-[#D1D5DB] group-hover:text-[#F0A868] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${tint} mb-4`}>
                  <Icon size={17} className={ink} />
                </div>
                <p className="font-serif text-lg text-[#1B2340] mb-1 pr-6">{title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;