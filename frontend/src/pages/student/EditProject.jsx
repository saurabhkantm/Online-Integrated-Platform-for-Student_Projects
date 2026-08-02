import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getSingleProject, updateProject, submitProject } from "../../services/ProjectService.js";
import { X, Plus } from "lucide-react";

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

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getSingleProject(id);
        setTitle(project.title || "");
        setDescription(project.description || "");
        setCategory(project.category || "");
        setTechStack(project.techStack || []);
        setGithubLink(project.githubLink || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const addTech = (e) => {
    e.preventDefault();
    const value = techInput.trim();
    if (value && !techStack.includes(value)) {
      setTechStack([...techStack, value]);
    }
    setTechInput("");
  };

  const removeTech = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError("");

    if (techStack.length === 0) {
      setError("Add at least one tech stack tag.");
      return;
    }

    setSubmitting(true);
    try {
      await updateProject(id, { title, description, category, techStack });
      navigate("/student/my-project");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitForReview = async (e) => {
    e.preventDefault();
    setError("");

    if (techStack.length === 0) {
      setError("Add at least one tech stack tag.");
      return;
    }
    if (!githubLink.trim()) {
      setError("A GitHub link is required before submitting for review. Add it, then submit again.");
      return;
    }

    setSubmitting(true);
    try {
      await updateProject(id, { title, description, category, techStack });
      await submitProject(id);
      navigate("/student/my-project");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit project. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition-all duration-200";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0]">
        <Navbar />
        <div className="p-8 md:p-14 pt-32">
          <p className="text-sm text-[#6B7280]">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="p-8 pt-30 pl-14 pr-14">
        <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
          Edit draft
        </span>
        <h1 className="font-serif text-3xl text-[#1B2340] mt-2 mb-8">
          Update your project
        </h1>

        <form className="flex flex-col gap-5">
          <div>
            <label className="text-xs text-[#6B7280] mb-1 block">Project title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputBase}
            />
          </div>

          <div>
            <label className="text-xs text-[#6B7280] mb-1 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className={`${inputBase} resize-none`}
            />
          </div>

          <div>
            <label className="text-xs text-[#6B7280] mb-1 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={`${inputBase} appearance-none`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-[#6B7280] mb-1 block">Tech stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTech(e);
                }}
                placeholder="e.g. React, press Enter to add"
                className={inputBase}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 rounded-lg bg-[#1B2340] text-[#F7F5F0] hover:bg-[#232B4D] transition"
              >
                <Plus size={18} />
              </button>
            </div>
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B2340]/10 text-[#1B2340] text-sm"
                  >
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)}>
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-[#6B7280] mb-1 block">GitHub link</label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="Required only to submit for review"
              className={inputBase}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-2 max-w-3xl ">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={submitting}
              className="flex-1 py-3 rounded-lg border border-[#1B2340] text-[#1B2340] font-semibold text-sm hover:bg-white disabled:opacity-50 transition-all duration-200"
            >
              {submitting ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={handleSubmitForReview}
              disabled={submitting}
              className="flex-1 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold text-sm hover:bg-[#EC9B52] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {submitting ? "Submitting..." : "Submit for review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;