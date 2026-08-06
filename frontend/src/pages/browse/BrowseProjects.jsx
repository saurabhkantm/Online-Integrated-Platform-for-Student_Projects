import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getPublicProjects } from "../../services/ProjectService.js";
import { getOrganization } from "../../services/organizationService.js";
import { Search, FileText, Eye, Share2, Download, Check } from "lucide-react";
import { Star } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { useDebounce } from "../../hooks/deBounce.js";


const categories = [
  "AI / Machine Learning",
  "Web Development",
  "Android Development",
  "IoT",
  "Blockchain",
  "Cyber Security",
  "Cloud Computing",
  "Data Science & Analytics",
  "AR / VR",
  "Robotics & Embedded Systems",
  "Other",
];

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [organization, setOrganization] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const debouncedSearch = useDebounce(search, 400);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const data = await getOrganization();
        setOrganizations(Array.isArray(data) ? data : data?.organizations || []);
      } catch (err) {
        console.error("Failed to load organizations", err);
      }
    };
    fetchOrgs();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (debouncedSearch) filters.search = debouncedSearch;
        if (category) filters.category = category;
        if (organization) filters.organization = organization;

        const data = await getPublicProjects(filters);
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [debouncedSearch, category, organization]);

  const hasActiveFilters = search || category || organization;

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setOrganization("");
  };

  // --- Action handlers ---
  // Each one stops the click from bubbling up to the card's onClick (which navigates).

  
  const handleShare = async (e, project) => {
    e.stopPropagation();
    const url = `${window.location.origin}/projects/${project._id}`;

    if (navigator.share) {
      // Native share sheet on mobile / supported browsers
      try {
        await navigator.share({ title: project.title, url });
      } catch (err) {
        // user cancelled the share sheet — ignore
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(project._id);
        setTimeout(() => setCopiedId(null), 1500);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Browse
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2 mb-6">
          Approved Projects
        </h1>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition appearance-none min-w-[180px]"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition appearance-none min-w-[180px]"
          >
            <option value="">All colleges</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 rounded-lg border border-[#E2E4EA] text-sm text-[#6B7280] hover:border-[#1B2340] hover:text-[#1B2340] transition"
            >
              Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-[#6B7280]">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
            <FileText size={28} className="mx-auto text-[#9CA3AF] mb-3" />
            <p className="text-sm text-[#6B7280]">
              {hasActiveFilters ? "No projects match your filters." : "No approved projects yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/projects/${project._id}`);
                }}
                className="group relative flex flex-col p-6 rounded-2xl bg-white border border-[#E2E4EA] hover:border-[#F0A868] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-serif text-lg text-[#1B2340] leading-snug">
                    {project.title}
                  </p>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-medium">
                    Approved
                  </span>
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-1.5 mb-3">
                  {project.reviewCount > 0 ? (
                    <>
                      <Star size={13} className="fill-[#F0A868] text-[#F0A868]" />
                      <span className="text-xs font-semibold text-[#1B2340]">
                        {project.averageRating?.toFixed(1)}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        ({project.reviewCount} {project.reviewCount === 1 ? "review" : "reviews"})
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-[#9CA3AF]">No reviews yet</span>
                  )}
                </div>

                <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#6B7280] text-xs">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Action row: View / Share / Download */}
                <div className="flex items-center gap-2 mb-5">
                  <button
                   
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E4EA] text-xs font-medium text-[#1B2340] hover:bg-[#1B2340] hover:text-white hover:border-[#1B2340] transition-colors duration-200"
                  >
                    <Eye size={13} />
                   {project.viewCount} Views

                  </button>

                  <button
                    onClick={(e) => handleShare(e, project)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E4EA] text-xs font-medium text-[#1B2340] hover:bg-[#1B2340] hover:text-white hover:border-[#1B2340] transition-colors duration-200"
                  >
                    {copiedId === project._id ? (
                      <>
                        <Check size={13} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Share2 size={13} />
                        Share
                      </>
                    )}
                  </button>

                  
                </div>

                <div className="mt-auto pt-4 border-t border-[#F0F0EC] flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#1B2340]/10 flex items-center justify-center text-[9px] font-semibold text-[#1B2340]">
                      {project.createdBy?.name?.charAt(0) || "?"}
                    </span>
                    {project.createdBy?._id === user?._id ? "You" : project.createdBy?.name}
                  </span>
                  <span className="font-medium text-[#6B7280]">{project.organization?.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProjects;