import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getLeaderboard } from "../../services/organizationService";
import { Star, Trophy, Building2 } from "lucide-react";

const medal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

const LeaderboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(10);
        setProjects(data.topProjects || []);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
            Rankings
          </span>
        </div>
        <h1 className="font-serif text-4xl text-[#1B2340] mb-2">Leaderboard</h1>
        <p className="text-sm text-[#6B7280] mb-10">
          Top-rated projects, ranked by average rating and review count.
        </p>

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-white border border-[#E2E4EA] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
              <Trophy size={22} className="text-[#9CA3AF]" />
            </div>
            <p className="font-serif text-lg text-[#1B2340] mb-1">No rankings yet</p>
            <p className="text-sm text-[#6B7280]">
              Projects will appear here once they start receiving reviews.
            </p>
          </div>
        )}

        {/* Leaderboard list */}
        {!loading && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map((project, index) => {
              const rank = index + 1;
              const isTopThree = rank <= 3;

              return (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className={`group flex gap-4 p-5 rounded-2xl bg-white border transition-all duration-200 ${
                    isTopThree
                      ? "border-[#F0A868]/40 hover:border-[#F0A868] hover:shadow-lg"
                      : "border-[#E2E4EA] hover:border-[#1B2340]/20 hover:shadow-md"
                  }`}
                >
                  {/* Rank */}
                  <div className="w-10 shrink-0 flex items-start justify-center pt-1">
                    {isTopThree ? (
                      <span className="text-2xl leading-none">{medal(rank)}</span>
                    ) : (
                      <span className="text-lg font-serif text-[#9CA3AF]">
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="min-w-0 flex-1">
                    {/* Title row + rating */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <p className="font-serif text-base text-[#1B2340] group-hover:text-[#F0A868] transition-colors">
                        {project.title}
                      </p>
                      <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full bg-[#1B2340]/5">
                        <Star size={12} className="fill-[#F0A868] text-[#F0A868]" />
                        <span className="text-xs font-semibold text-[#1B2340]">
                          {project.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">
                          ({project.reviewCount})
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    {project.category && (
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#F0A868] font-semibold">
                        {project.category}
                      </span>
                    )}

                    {/* Description */}
                    {project.description && (
                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mt-1.5 mb-2.5">
                        {project.description}
                      </p>
                    )}

                    {/* Tech stack */}
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-full bg-[#1B2340]/5 text-[#1B2340] text-[10px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#1B2340]/5 text-[#6B7280] text-[10px]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Creator + org */}
                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#1B2340]/10 flex items-center justify-center text-[8px] font-semibold text-[#1B2340]">
                          {project.createdBy?.name?.charAt(0) || "?"}
                        </span>
                        {project.createdBy?.name}
                      </span>
                      {project.organization?.name && (
                        <span className="flex items-center gap-1">
                          <Building2 size={11} className="text-[#9CA3AF]" />
                          {project.organization.name}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;