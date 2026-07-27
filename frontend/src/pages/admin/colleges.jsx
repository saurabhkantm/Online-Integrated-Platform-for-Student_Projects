import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { Building2, Plus, X } from "lucide-react";
import { getOrganization,setOrganization } from "../../services/organizationService.js";

const ManageColleges = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchOrgs = async () => {
    setLoading(true);
    try {
      const data = await getOrganization();
      setOrganizations(Array.isArray(data) ? data : data?.organizations || []);
    } catch (err) {
      console.error("Failed to load organizations", err);
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await setOrganization({ name, code: code.toUpperCase() });
      setName("");
      setCode("");
      setShowForm(false);
      fetchOrgs();
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
              Admin
            </span>
            <h1 className="font-serif text-3xl text-[#1B2340] mt-2">Manage Colleges</h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Add and view the institutions registered on EduArchive.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Cancel" : "Add College"}
          </button>
        </div>

        {/* Add college form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 p-6 rounded-xl bg-white border border-[#E2E4EA] flex flex-col md:flex-row gap-4 items-start md:items-end animate-fade-in-up"
          >
            <div className="flex-1 w-full">
              <label className="text-xs text-[#6B7280] mb-1 block">College name</label>
              <input
                type="text"
                placeholder="e.g. VIT Vellore"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E2E4EA] text-sm text-[#1B2340] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
              />
            </div>

            <div className="w-full md:w-40">
              <label className="text-xs text-[#6B7280] mb-1 block">Code</label>
              <input
                type="text"
                placeholder="e.g. VIT"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={10}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E2E4EA] text-sm text-[#1B2340] uppercase focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold text-sm hover:bg-[#EC9B52] disabled:opacity-50 transition whitespace-nowrap"
            >
              {submitting ? "Adding..." : "Add College"}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        {/* Colleges list */}
        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-[#6B7280]">Loading colleges...</p>
          ) : organizations.length === 0 ? (
            <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
              <Building2 size={28} className="mx-auto text-[#9CA3AF] mb-3" />
              <p className="text-sm text-[#6B7280]">No colleges added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {organizations.map((org) => (
                <div
                  key={org._id}
                  className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/40 transition"
                >
                  <div className="w-6 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/10 mb-3">
                    <Building2 size={18} className="text-[#1B2340]" />
                  </div>
                  <p className="font-serif text-lg text-[#1B2340] mb-1">{org.name}</p>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">{org.code}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageColleges;