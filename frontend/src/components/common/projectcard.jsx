import React from 'react'

const Projectcard = () => {
  const ProjectCard = ({ project, rank }) => {
  const isTopThree = rank <= 3;

  return (
    <Link
      to={`/projects/${project._id}`}
      className={`group flex flex-col h-full rounded-2xl bg-white border transition-all duration-300 ${
        rank === 1
          ? "p-7 scale-105 border-[#F0A868] shadow-2xl"
          : "p-5 border-[#E2E4EA]"
      } ${
        isTopThree
          ? "hover:border-[#F0A868] hover:shadow-xl"
          : "hover:border-[#1B2340]/20 hover:shadow-md"
      }`}
    >
      {/* Medal / Rank */}
      <div className="flex justify-center mb-5">
        {isTopThree ? (
          <span className="text-5xl">{medal(rank)}</span>
        ) : (
          <span className="text-2xl font-bold text-[#9CA3AF]">
            #{rank}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="text-center mb-2">
        <h3 className="font-serif text-xl font-semibold text-[#1B2340] group-hover:text-[#F0A868] transition-colors line-clamp-2">
          {project.title}
        </h3>

        {project.category && (
          <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.15em] text-[#F0A868] font-semibold">
            {project.category}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2340]/5">
          <Star
            size={14}
            className="fill-[#F0A868] text-[#F0A868]"
          />
          <span className="text-sm font-semibold text-[#1B2340]">
            {project.averageRating?.toFixed(1) ?? "0.0"}
          </span>
          <span className="text-xs text-[#9CA3AF]">
            ({project.reviewCount ?? 0})
          </span>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-[#6B7280] text-center leading-relaxed line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>
      )}

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-xs font-medium"
            >
              {tech}
            </span>
          ))}

          {project.techStack.length > 4 && (
            <span className="px-2.5 py-1 rounded-full bg-[#1B2340]/5 text-[#6B7280] text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t pt-4 mt-auto">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-8 h-8 rounded-full bg-[#1B2340]/10 flex items-center justify-center text-xs font-semibold text-[#1B2340]">
              {project.createdBy?.name?.charAt(0) || "?"}
            </span>

            <span className="text-sm text-[#1B2340] truncate">
              {project.createdBy?.name}
            </span>
          </div>

          {project.organization?.name && (
            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
              <Building2 size={14} />
              <span className="truncate">
                {project.organization.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
}

export default projectcard