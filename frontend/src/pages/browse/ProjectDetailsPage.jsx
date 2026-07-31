import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import ProjectReviews from "../../components/projects/projectReview.jsx";
import { getPublicProjectById } from "../../services/ProjectService.js";
import { useAuth } from "../../hooks/useAuth";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, FileText, Building2 } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getPublicProjectById(id);
        setProject(data);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0]">
        <Navbar />
        <div className="p-8 md:p-14 pt-32 max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-3 w-24 bg-[#1B2340]/10 rounded-full" />
            <div className="h-9 w-3/4 bg-[#1B2340]/10 rounded-md" />
            <div className="h-3 w-40 bg-[#1B2340]/10 rounded-full" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-[#1B2340]/10 rounded-full" />
              <div className="h-3 w-full bg-[#1B2340]/10 rounded-full" />
              <div className="h-3 w-2/3 bg-[#1B2340]/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F5F0]">
        <Navbar />
        <div className="p-8 md:p-14 pt-32 max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
            <FileText size={22} className="text-[#9CA3AF]" />
          </div>
          <p className="font-serif text-lg text-[#1B2340] mb-1">Project not found</p>
          <p className="text-sm text-[#6B7280]">
            It may have been removed, or the link isn&apos;t quite right.
          </p>
        </div>
      </div>
    );
  }

  const isOwner = project.createdBy?._id === user?._id;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="px-6 pt-32 pb-20 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-[2.75rem] leading-tight text-[#1B2340] mb-3">
          {project.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8 text-sm text-[#6B7280]">
          <span>
            By <span className="text-[#1B2340] font-medium">{isOwner ? "you" : project.createdBy?.name}</span>
          </span>
          {project.organization?.name && (
            <>
              <span className="text-[#1B2340]/20">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={13} className="text-[#9CA3AF]" />
                {project.organization.name}
              </span>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1B2340]/10 mb-8" />

        {/* Description */}
        <p className="text-[15px] text-[#4A5568] leading-[1.8] mb-8">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full border border-[#1B2340]/10 bg-white text-[#1B2340] text-xs font-medium tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {(project.githubLink || project.liveLink) && (
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#1B2340]/15 text-sm text-[#1B2340] hover:bg-[#1B2340] hover:text-white hover:border-[#1B2340] transition-colors duration-200"
              >
                <FaGithub size={14} />
                Repository
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#1B2340]/15 text-sm text-[#1B2340] hover:bg-[#F0A868] hover:text-white hover:border-[#F0A868] transition-colors duration-200"
              >
                <ExternalLink size={14} />
                Live demo
              </a>
            )}
          </div>
        )}

        {/* Reviews */}
        <div className="pt-2 border-t border-[#1B2340]/10">
          <ProjectReviews projectId={project._id} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;