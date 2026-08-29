import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import { getAdminOverview } from "../../services/adminService.js";
import {
  FileText, CheckCircle2, Hourglass, Users, Building2, GraduationCap, UserCheck, ShieldAlert,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);


  console.log("data is:", data);

  const fetchData = async () => {
    try {
      const result = await getAdminOverview();
      setData(result);
    } catch (err) {
      console.error("Failed to load admin overview", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = data?.stats;
  const statCards = [
    { label: "Total projects", value: stats?.totalProjects, icon: FileText, bg: "bg-[#1B2340]/10", color: "text-[#1B2340]" },
    { label: "Approved", value: stats?.approved, icon: CheckCircle2, bg: "bg-green-100", color: "text-green-700" },
    { label: "Pending", value: stats?.pending, icon: Hourglass, bg: "bg-[#F0A868]/20", color: "text-[#B9762F]" },
    { label: "Registered users", value: stats?.totalUsers, icon: Users, bg: "bg-[#8B7CF0]/15", color: "text-[#6D5FD8]" },
    { label: "Total colleges", value: stats?.totalColleges, icon: Building2, bg: "bg-[#4C7CF0]/10", color: "text-[#4C7CF0]" },
    { label: "Total faculty", value: stats?.totalFaculty, icon: UserCheck, bg: "bg-teal-100", color: "text-teal-700" },
    { label: "Total students", value: stats?.totalStudents, icon: GraduationCap, bg: "bg-[#F0A868]/20", color: "text-[#B9762F]" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />
      <div className="p-8 pt-30 pl-14 pr-14">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">Admin Dashboard</span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="text-sm text-[#6B7280] mt-2 max-w-md">
          University-wide stats, user management, and system reports.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
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

        <div className="flex gap-4 mt-8">
          <Link to="/admin/users" className="px-6 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition">
            Manage users
          </Link>
          <Link to="/admin/colleges" className="px-6 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] text-sm font-medium hover:bg-white transition">
            Manage colleges
          </Link>
        </div>

       
        {/* {!loading && data?.pendingProjects?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-serif text-xl text-[#1B2340] mb-4">Pending approvals</h2>
            <div className="rounded-xl bg-white border border-[#E2E4EA] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E4EA] text-left text-xs text-[#6B7280]">
                    <th className="p-4">Project</th>
                    <th className="p-4">Student</th>
                   
                    <th className="p-4">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pendingProjects.map((p) => (
                    <tr key={p._id} className="border-b last:border-0 border-[#F0F0EC] hover:bg-[#F7F5F0] transition">
                      <td className="p-4 font-medium text-[#1B2340]">{p.title}</td>
                      <td className="p-4 text-[#6B7280]">{p.createdBy?.name}</td>
                                         <td className="p-4">
                        {p.plagiarismFlagged && (
                          <span className="flex items-center gap-1 text-red-600 text-xs">
                            <ShieldAlert size={12} /> {p.plagiarismScore}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AdminDashboard;