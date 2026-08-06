import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import ProjectReviews from "../../components/projects/projectReview.jsx";
import { getPublicProjectById } from "../../services/ProjectService.js";
import { useAuth } from "../../hooks/useAuth";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, FileText, Building2, Star, User, GraduationCap, Eye } from "lucide-react";

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
        <div className="px-6 pt-32 pb-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="animate-pulse space-y-6">
            <div className="h-3 w-24 bg-[#1B2340]/10 rounded-full" />
            <div className="h-10 w-3/4 bg-[#1B2340]/10 rounded-md" />
            <div className="space-y-2 pt-4">
              <div className="h-3 w-full bg-[#1B2340]/10 rounded-full" />
              <div className="h-3 w-full bg-[#1B2340]/10 rounded-full" />
              <div className="h-3 w-2/3 bg-[#1B2340]/10 rounded-full" />
            </div>
          </div>
          <div className="hidden lg:block h-64 bg-[#1B2340]/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F5F0]">
        <Navbar />
        <div className="px-6 pt-32 pb-20 max-w-3xl mx-auto text-center">
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
  const hasRating = project.reviewCount > 0;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="px-6 pt-32 pb-24 max-w-6xl mx-auto">
        {/* Eyebrow + rating */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
              {project.category}
            </span>
          </div>

          {hasRating ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1B2340]/10">
              <Star size={13} className="fill-[#F0A868] text-[#F0A868]" />
              <span className="text-xs font-semibold text-[#1B2340]">
                {project.averageRating?.toFixed(1)}
              </span>
              <span className="text-xs text-[#9CA3AF]">
                ({project.reviewCount})
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1B2340]/10">
              <Eye size={13} className="text-[#9CA3AF]" />
              <span className="text-xs font-semibold text-[#1B2340]">
                {project.viewCount || 0}
              </span>
              <span className="text-xs text-[#9CA3AF]">views</span>
            </div>
            </div>
          ) : (
            <span className="text-xs text-[#9CA3AF] px-3 py-1 rounded-full bg-white border border-[#1B2340]/10">
              No reviews yet
            </span>
          )}

        </div>
        
        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] text-[#1B2340] mb-10 max-w-3xl">
          {project.title}
        </h1>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main column */}
          <div className="min-w-0">
            <p className="text-[15px] text-[#4A5568] leading-[1.8] mb-8">
              {project.description}
            </p>

            {project.techStack?.length > 0 && (
              <div className="mb-10">
                <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-semibold mb-3">
                  Built with
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full border border-[#1B2340]/10 bg-white text-[#1B2340] text-xs font-medium tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-[#1B2340]/10">
              <ProjectReviews projectId={project._id} isOwner={isOwner} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 h-fit space-y-6">
            <div className="rounded-2xl bg-white border border-[#E2E4EA] p-6">
              <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-semibold mb-4">
                About this project
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-[#1B2340]">
                      {project.createdBy?.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#9CA3AF] mb-0.5">Created by</p>
                    <p className="text-sm text-[#1B2340] font-medium truncate">
                      {isOwner ? "You" : project.createdBy?.name}
                    </p>
                  </div>
                </div>

                {project.organization?.name && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                      <Building2 size={13} className="text-[#1B2340]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9CA3AF] mb-0.5">Organization</p>
                      <p className="text-sm text-[#1B2340] font-medium truncate">
                        {project.organization.name}
                      </p>
                    </div>
                  </div>
                )}

                {project.assignedFaculty?.name && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                      <GraduationCap size={13} className="text-[#1B2340]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9CA3AF] mb-0.5">Faculty mentor</p>
                      <p className="text-sm text-[#1B2340] font-medium truncate">
                        {project.assignedFaculty.name}
                      </p>
                    </div>
                  </div>
                )}

                {project.teamMembers?.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                      <User size={13} className="text-[#1B2340]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9CA3AF] mb-0.5">Team size</p>
                      <p className="text-sm text-[#1B2340] font-medium">
                        {project.teamMembers.length + 1} members
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {(project.githubLink || project.liveLink) && (
                <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-[#1B2340]/10">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#1B2340]/15 text-sm font-medium text-[#1B2340] hover:bg-[#1B2340] hover:text-white hover:border-[#1B2340] transition-colors duration-200"
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F0A868] text-sm font-medium text-white hover:bg-[#e0975a] transition-colors duration-200"
                    >
                      <ExternalLink size={14} />
                      Live demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;