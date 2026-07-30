import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getPublicProjects } from "../../services/ProjectService.js";
import { Search, FileText } from "lucide-react";
import { useDebounce } from "../../hooks/deBounce.js";

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getPublicProjects(
          debouncedSearch ? { search: debouncedSearch } : {}
        );
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [debouncedSearch]);

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

        <div className="relative max-w-md mb-8">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
          />
        </div>

        {loading ? (
          <p className="text-sm text-[#6B7280]">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-white border border-[#E2E4EA]">
            <FileText size={28} className="mx-auto text-[#9CA3AF] mb-3" />
            <p className="text-sm text-[#6B7280]">
              {search ? "No projects match your search." : "No approved projects yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="p-6 rounded-xl bg-white border border-[#E2E4EA] hover:border-[#1B2340]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-serif text-lg text-[#1B2340] mb-1">{project.title}</p>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>{project.createdBy?.name}</span>
                  <span>{project.organization?.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProjects;