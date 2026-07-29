import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Link as LinkIcon, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { createProject, submitProject } from "../../services/projectService";
import { getUsersByRole } from "../../services/userService";

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

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [assignedFaculty, setAssignedFaculty] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [documentation, setDocumentation] = useState("");

  const [facultyList, setFacultyList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [faculty, students] = await Promise.all([
          getUsersByRole("faculty"),
          getUsersByRole("student"),
        ]);
        setFacultyList(faculty || []);
        setStudentList(students || []);
      } catch (err) {
        console.error("Failed to load faculty/students", err);
      }
    };
    fetchUsers();
  }, []);

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

  const toggleTeamMember = (userId) => {
    setTeamMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (techStack.length === 0) {
      setError("Add at least one tech stack tag.");
      return;
    }
    if (!githubLink.trim()) {
      setError("A GitHub link is required before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // Step 1: create as draft
      const project = await createProject({
        title,
        description,
        category,
        techStack,
        assignedFaculty,
        teamMembers,
        githubLink,
        liveLink,
        documentation,
      });

      // Step 2: immediately submit for review
      await submitProject(project._id);

      navigate("/student/my-projects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit project. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-[#E2E4EA] bg-white text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full ">
      {/* Title */}
      <div>
        <label className="text-xs text-[#6B7280] mb-1 block">Project title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Smart Attendance System"
          className={inputBase}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs text-[#6B7280] mb-1 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="What does your project do, and what problem does it solve?"
          className={`${inputBase} resize-none`}
        />
      </div>

      {/* Category */}
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

      {/* Tech stack */}
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

      {/* Assigned faculty */}
      <div>
        <label className="text-xs text-[#6B7280] mb-1 block">Assign to faculty</label>
        <select
          value={assignedFaculty}
          onChange={(e) => setAssignedFaculty(e.target.value)}
          required
          disabled={facultyList.length === 0}
          className={`${inputBase} appearance-none disabled:opacity-50`}
        >
          <option value="" disabled>
            {facultyList.length === 0 ? "No faculty available" : "Select a faculty reviewer"}
          </option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name} ({f.email})
            </option>
          ))}
        </select>
      </div>

      {/* Team members */}
      {studentList.length > 0 && (
        <div>
          <label className="text-xs text-[#6B7280] mb-2 block">Team members (optional)</label>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border border-[#E2E4EA] rounded-lg p-3">
            {studentList.map((s) => (
              <label key={s._id} className="flex items-center gap-2 text-sm text-[#1B2340]">
                <input
                  type="checkbox"
                  checked={teamMembers.includes(s._id)}
                  onChange={() => toggleTeamMember(s._id)}
                  className="accent-[#1B2340]"
                />
                {s.name} ({s.email})
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="relative">
        <FaGithub size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="url"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
          placeholder="GitHub repository link"
          className={`${inputBase} pl-11`}
        />
      </div>

      <div className="relative">
        <LinkIcon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="url"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          placeholder="Live demo link (optional)"
          className={`${inputBase} pl-11`}
        />
      </div>

      <div className="relative">
        <FileText size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="url"
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
          placeholder="Documentation link (optional)"
          className={`${inputBase} pl-11`}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 py-3 rounded-lg bg-[#F0A868] text-[#1B2340] font-semibold text-sm hover:bg-[#EC9B52] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {submitting ? "Submitting..." : "Submit project for review"}
      </button>
    </form>
  );
};

export default ProjectForm;