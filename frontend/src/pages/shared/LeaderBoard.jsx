import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getLeaderboard } from "../../services/organizationService.js";
import { Star, Trophy, Building2, Flag, Users } from "lucide-react";

const medal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

const LeaderboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard({ limit: 10 });
        setProjects(data.projects || []);
        setStats(data.stats || null);
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

      <div className="px-6 pt-32 pb-24 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
            Rankings
          </span>
        </div>
        <h1 className="font-serif text-4xl text-[#1B2340] mb-2">Leaderboard</h1>
        <p className="text-sm text-[#6B7280] mb-8">
          Top-rated projects, ranked by average rating and review count.
        </p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1B2340]/10 shrink-0">
                <Flag size={16} className="text-[#1B2340]" />
              </div>
              <div>
                <p className="text-lg font-serif text-[#1B2340] leading-none">{stats.totalRanked}</p>
                <p className="text-[11px] text-[#6B7280] mt-1">Ranked projects</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F0A868]/20 shrink-0">
                <Star size={16} className="text-[#F0A868]" />
              </div>
              <div>
                <p className="text-lg font-serif text-[#1B2340] leading-none">{stats.avgRatingOverall}</p>
                <p className="text-[11px] text-[#6B7280] mt-1">Average rating</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1B2340]/10 shrink-0">
                <Users size={16} className="text-[#1B2340]" />
              </div>
              <div>
                <p className="text-lg font-serif text-[#1B2340] leading-none">{stats.totalParticipants}</p>
                <p className="text-[11px] text-[#6B7280] mt-1">Participants</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F0A868]/20 shrink-0">
                <Trophy size={16} className="text-[#F0A868]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-serif text-[#1B2340] leading-tight truncate">
                  {projects[0]?.title || "—"}
                </p>
                <p className="text-[11px] text-[#6B7280] mt-1">Champion</p>
              </div>
            </div>
          </div>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const rank = index + 1;
              const isTopThree = rank <= 3;

              return (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className={`group flex w-full gap-4 p-5 rounded-2xl bg-white border transition-all duration-200 ${isTopThree
                      ? "border-[#F0A868]/40 hover:border-[#F0A868] hover:shadow-lg"
                      : "border-[#E2E4EA] hover:border-[#1B2340]/20 hover:shadow-md"
                    }`}
                >
                  {/* Rank */}
                  <div className="w-10 shrink-0 flex justify-center pt-1">
                    {isTopThree ? (
                      <span className="text-4xl leading-none">{medal(rank)}</span>
                    ) : (
                      <span className="text-lg font-serif font-semibold text-[#9CA3AF]">
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg font-semibold text-[#1B2340] group-hover:text-[#F0A868] transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        {project.category && (
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#F0A868] font-semibold">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full bg-[#1B2340]/5 w-fit">
                        <Star
                          size={12}
                          className="fill-[#F0A868] text-[#F0A868]"
                        />
                        <span className="text-xs font-semibold text-[#1B2340]">
                          {project.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">
                          ({project.reviewCount})
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {project.description && (
                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    )}

                    {/* Tech Stack */}
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
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
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280]">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#1B2340]/10 flex items-center justify-center text-[10px] font-semibold text-[#1B2340]">
                          {project.createdBy?.name?.charAt(0) || "?"}
                        </span>
                        <span>{project.createdBy?.name}</span>
                      </div>

                      {project.organization?.name && (
                        <div className="flex items-center gap-1">
                          <Building2 size={13} className="text-[#9CA3AF]" />
                          <span>{project.organization.name}</span>
                        </div>
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