import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { getAllUsers, updateUserRole, toggleSuspendUser, deleteUser } from "../../services/userService.js";
import { Search, Users as UsersIcon, ShieldCheck, Ban, Trash2, ChevronDown } from "lucide-react";

const roleStyles = {
  student: { bg: "bg-[#1B2340]/10", text: "text-[#1B2340]" },
  faculty: { bg: "bg-teal-100", text: "text-teal-700" },
  admin: { bg: "bg-[#F0A868]/20", text: "text-[#B9762F]" },
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionId, setActionId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    setActionId(id);
    try {
      const updated = await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role.");
    } finally {
      setActionId(null);
    }
  };

  const handleSuspend = async (id) => {
    setActionId(id);
    try {
      const updated = await toggleSuspendUser(id);
      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    setActionId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user.");
    } finally {
      setActionId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14 max-w-7xl mx-auto">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Admin
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2">Manage Users</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          View, edit roles, suspend, or remove accounts.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-8">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 appearance-none"
          >
            <option value="">All roles</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-xl bg-white border border-[#E2E4EA] overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-[#6B7280]">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <UsersIcon size={24} className="mx-auto text-[#9CA3AF] mb-3" />
              <p className="text-sm text-[#6B7280]">No users match your filters.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E4EA] text-left text-xs text-[#6B7280]">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const role = roleStyles[u.role] || roleStyles.student;
                  const busy = actionId === u._id;
                  return (
                    <tr key={u._id} className="border-b last:border-0 border-[#F0F0EC] hover:bg-[#F7F5F0] transition">
                      <td className="p-4 font-medium text-[#1B2340]">{u.name}</td>
                      <td className="p-4 text-[#6B7280]">{u.email}</td>
                      <td className="p-4 text-[#6B7280]">{u.organization?.name || "—"}</td>
                      <td className="p-4">
                        <div className="relative inline-block">
                          <select
                            value={u.role}
                            disabled={busy}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className={`appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-medium ${role.bg} ${role.text} disabled:opacity-50`}
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>
                      <td className="p-4">
                        {u.suspended ? (
                          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                            Suspended
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSuspend(u._id)}
                            disabled={busy}
                            title={u.suspended ? "Unsuspend" : "Suspend"}
                            className="p-1.5 rounded-md text-[#9CA3AF] hover:bg-[#F0A868]/10 hover:text-[#B9762F] disabled:opacity-50 transition"
                          >
                            <Ban size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(u._id, u.name)}
                            disabled={busy}
                            title="Delete"
                            className="p-1.5 rounded-md text-[#9CA3AF] hover:bg-red-50 hover:text-red-500 disabled:opacity-50 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;