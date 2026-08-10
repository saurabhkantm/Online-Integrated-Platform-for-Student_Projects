import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import { Building2, Plus, X, Trash2, Search, Pencil, Check } from "lucide-react";
import {
  getOrganization,
  setOrganization,
  deleteOrganization,
  updateOrganization,
} from "../../services/organizationService.js";

const ManageColleges = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // --- Edit state ---
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);

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
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this college? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteOrganization(id);
      setOrganizations((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete college.");
    } finally {
      setDeletingId(null);
    }
  };

  // --- Edit handlers ---
  const startEdit = (org) => {
    setEditingId(org._id);
    setEditName(org.name);
    setEditCode(org.code);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCode("");
    setEditError("");
  };

  const saveEdit = async (id) => {
    if (!editName.trim() || !editCode.trim()) {
      setEditError("Both fields are required.");
      return;
    }

    setSaving(true);
    setEditError("");
    try {
      const res = await updateOrganization(id, {
        name: editName.trim(),
        code: editCode.trim().toUpperCase(),
      });
      setOrganizations((prev) =>
        prev.map((o) => (o._id === id ? res.organization : o))
      );
      setEditingId(null);
    } catch (err) {
      setEditError(err?.response?.data?.message || "Failed to update college.");
    } finally {
      setSaving(false);
    }
  };

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name?.toLowerCase().includes(search.toLowerCase()) ||
      org.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
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
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition-colors duration-200"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Cancel" : "Add College"}
          </button>
        </div>

        {/* Add college form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 p-6 rounded-2xl bg-white border border-[#E2E4EA] flex flex-col md:flex-row gap-4 items-start md:items-end"
          >
            <div className="flex-1 w-full">
              <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">College name</label>
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
              <label className="text-xs text-[#6B7280] mb-1.5 block font-medium">Code</label>
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
              className="px-6 py-2.5 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold text-sm hover:bg-[#EC9B52] disabled:opacity-50 transition-colors duration-200 whitespace-nowrap"
            >
              {submitting ? "Adding..." : "Add College"}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg border border-red-100">
            {error}
          </p>
        )}

        {/* Search bar */}
        {!loading && organizations.length > 0 && (
          <div className="relative mt-8 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search colleges..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
            />
          </div>
        )}

        {/* Colleges list */}
        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-[#E2E4EA] animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-[#1B2340]/10 mb-4" />
                  <div className="h-4 w-3/4 bg-[#1B2340]/10 rounded-full mb-2" />
                  <div className="h-3 w-1/3 bg-[#1B2340]/10 rounded-full" />
                </div>
              ))}
            </div>
          ) : organizations.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#E2E4EA]">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
                <Building2 size={22} className="text-[#9CA3AF]" />
              </div>
              <p className="font-serif text-lg text-[#1B2340] mb-1">No colleges added yet</p>
              <p className="text-sm text-[#6B7280] mb-5">
                Add your first institution to get started.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B2340] text-[#F7F5F0] text-sm font-medium hover:bg-[#232B4D] transition-colors duration-200"
              >
                <Plus size={16} />
                Add College
              </button>
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-white border border-[#E2E4EA]">
              <p className="text-sm text-[#6B7280]">No colleges match &quot;{search}&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {filteredOrgs.map((org) => {
                const isEditing = editingId === org._id;

                return (
                  <div
                    key={org._id}
                    className="group relative p-6 rounded-2xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/20 hover:shadow-md transition-all duration-200"
                  >
                    {isEditing ? (
                      // --- Edit mode ---
                      <div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/5 mb-4">
                          <Building2 size={18} className="text-[#1B2340]" />
                        </div>

                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="College name"
                          className="w-full mb-2 px-3 py-2 rounded-lg border border-[#1B2340]/15 text-sm text-[#1B2340] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
                        />
                        <input
                          type="text"
                          value={editCode}
                          onChange={(e) => setEditCode(e.target.value)}
                          placeholder="Code"
                          maxLength={10}
                          className="w-full mb-3 px-3 py-2 rounded-lg border border-[#1B2340]/15 text-xs text-[#1B2340] uppercase focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
                        />

                        {editError && (
                          <p className="text-xs text-red-600 mb-3">{editError}</p>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveEdit(org._id)}
                            disabled={saving}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B2340] text-white text-xs font-medium hover:bg-[#232B4D] disabled:opacity-50 transition-colors duration-200"
                          >
                            <Check size={13} />
                            {saving ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={saving}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E4EA] text-[#6B7280] text-xs font-medium hover:bg-[#F7F5F0] transition-colors duration-200"
                          >
                            <X size={13} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // --- View mode ---
                      <>
                        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => startEdit(org)}
                            aria-label={`Edit ${org.name}`}
                            className="w-7 h-7 flex items-center justify-center rounded-full text-[#9CA3AF] hover:bg-[#1B2340]/5 hover:text-[#1B2340] transition-colors duration-200"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(org._id)}
                            disabled={deletingId === org._id}
                            aria-label={`Delete ${org.name}`}
                            className="w-7 h-7 flex items-center justify-center rounded-full text-[#9CA3AF] hover:bg-red-50 hover:text-red-500 disabled:opacity-50 transition-colors duration-200"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1B2340]/5 mb-4">
                          <Building2 size={18} className="text-[#1B2340]" />
                        </div>
                        <p className="font-serif text-lg text-[#1B2340] mb-1 pr-12 leading-snug">
                          {org.name}
                        </p>
                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide font-medium">
                          {org.code}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageColleges;