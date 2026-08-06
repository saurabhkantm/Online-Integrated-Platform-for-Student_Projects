import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getLeaderboard } from "../../services/OrganizationService.js";
import {
  Star,
  Trophy,
  Flag,
  Users,
  Eye,
  Heart,
  Download,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Bookmark,
  Share2,
  Crown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  BarChart3,
} from "lucide-react";

/**
 * ============================================================================
 * BACKEND CONTRACT — fields this page expects from getLeaderboard()
 * ============================================================================
 * Everything below has a safe fallback (—, 0, or a hidden section) if the
 * field is missing, so this page won't break against your current API.
 * But to fully match the design, getLeaderboard({ page, limit, range,
 * category, college, tech }) should eventually resolve to:
 *
 * {
 *   stats: {
 *     totalRanked: number,
 *     avgRatingOverall: number,
 *     avgRatingDeltaLabel: string,      // e.g. "+0.12 from last month"
 *     totalParticipants: number,
 *   },
 *   projects: [{
 *     _id, title, description, category, techStack: string[],
 *     averageRating: number, reviewCount: number,
 *     createdBy: { name }, organization: { name },
 *     stats: { views, likes, downloads, comments },
 *     rankChange: number,               // +1, -1, 0 (or null for "new")
 *     badge: "Featured" | "Trending" | null,
 *     iconColor: string,                // tailwind bg class for the avatar chip
 *   }],
 *   topPerformers: {
 *     highestRated:  { title, value },  // value e.g. "5.0"
 *     mostViewed:    { title, value },  // value e.g. "3.2K"
 *     mostLiked:     { title, value },
 *     mostDownloaded:{ title, value },
 *   },
 *   categories: [{ name, percent, color }],   // should sum to 100
 *   pagination: { page, totalPages },
 * }
 * ============================================================================
 */


const medal = (rank) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null);

const StatPill = ({ icon: Icon, value, tone = "text-[#6B7280]" }) => (
  <span className={`inline-flex items-center gap-1 text-xs ${tone}`}>
    <Icon size={13} />
    {value}
  </span>
);

const RankChange = ({ delta }) => {
  if (delta === null || delta === undefined) {
    return <span className="text-xs text-[#9CA3AF]">New</span>;
  }
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
        <Minus size={12} /> —
      </span>
    );
  }
  const up = delta > 0;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-600" : "text-rose-500"}`}>
      {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {Math.abs(delta)}
    </span>
  );
};

// Lightweight dependency-free donut (percent-based pie via conic-gradient)
const CategoryDonut = ({ categories }) => {
  if (!categories || categories.length === 0) return null;
  let cumulative = 0;
  const stops = categories
    .map((c) => {
      const start = cumulative;
      cumulative += c.percent;
      return `${c.color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  return (
    <div className="flex items-center gap-6">
      <div
        className="w-28 h-28 rounded-full shrink-0"
        style={{
          background: `conic-gradient(${stops})`,
          mask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 calc(100% - 17px))",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 calc(100% - 17px))",
        }}
      />
      <div className="flex-1 space-y-2">
        {categories.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-[#1B2340]">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
            <span className="text-[#6B7280] font-medium">{c.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeaderboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [topPerformers, setTopPerformers] = useState(null);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [range, setRange] = useState("All Time");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboard({ limit: 10, page: pagination.page, range });
        setProjects(data.projects || []);
        setStats(data.stats || null);
        setTopPerformers(data.topPerformers || null);
        setCategories(data.categories || []);
        setPagination((p) => ({ ...p, totalPages: data.pagination?.totalPages || 1 }));
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, range]);

  const top3 = projects.slice(0, 3);
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3; // 2nd, 1st, 3rd
  const rest = projects.slice(3);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Navbar />

      <div className="px-6 pt-32 pb-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0A868]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#F0A868] font-semibold">
                Rankings
              </span>
            </div>
            <h1 className="font-serif text-4xl text-[#1B2340] mb-2 flex items-center gap-2">
              Leaderboard <Trophy size={28} className="text-[#F0A868]" />
            </h1>
            <p className="text-sm text-[#6B7280]">
              Top-rated projects, ranked by average rating and review count.
            </p>
          </div>

          <button
            onClick={() => setPagination((p) => ({ ...p, page: p.page }))}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E4EA] text-xs text-[#6B7280] hover:border-[#1B2340]/20 transition-colors w-fit"
          >
            <RefreshCw size={13} />
            Last updated: Today, 10:30 AM
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#4C7CF0]/10 shrink-0">
              <Flag size={16} className="text-[#4C7CF0]" />
            </div>
            <div>
              <p className="text-lg font-serif text-[#1B2340] leading-none">{stats?.totalRanked ?? "—"}</p>
              <p className="text-[11px] text-[#6B7280] mt-1">Total Ranked Projects</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F0A868]/20 shrink-0">
              <Star size={16} className="text-[#F0A868]" />
            </div>
            <div>
              <p className="text-lg font-serif text-[#1B2340] leading-none flex items-center gap-1">
                {stats?.avgRatingOverall ?? "—"}
                {stats?.avgRatingDeltaLabel && <TrendingUp size={13} className="text-emerald-500" />}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1">
                {stats?.avgRatingDeltaLabel || "Average rating"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8B7CF0]/15 shrink-0">
              <Users size={16} className="text-[#8B7CF0]" />
            </div>
            <div>
              <p className="text-lg font-serif text-[#1B2340] leading-none">{stats?.totalParticipants ?? "—"}</p>
              <p className="text-[11px] text-[#6B7280] mt-1">Total Participants</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#E2E4EA]">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/15 shrink-0">
              <Crown size={16} className="text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-serif text-[#1B2340] leading-tight truncate">
                {projects[0]?.title || "—"}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1">
                Current Champion{projects[0]?.organization?.name ? ` · ${projects[0].organization.name}` : ""}
              </p>
            </div>
          </div>
        </div>

        
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-white border border-[#E2E4EA] animate-pulse" />
            ))}
          </div>
        )}

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

        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            <div>
              {/* Podium */}
              {top3.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {podiumOrder.map((project) => {
                    if (!project) return null;
                    const rank = projects.indexOf(project) + 1;
                    const isFirst = rank === 1;
                    return (
                      <Link
                        to={`/projects/${project._id}`}
                        key={project._id}
                        className={`relative flex flex-col items-center text-center p-6 rounded-2xl bg-white border transition-all ${
                          isFirst
                            ? "border-[#F0A868]/50 shadow-md md:-translate-y-3"
                            : "border-[#E2E4EA] hover:shadow-md"
                        }`}
                      >
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl">{medal(rank)}</span>
                        <div className="w-16 h-16 rounded-full bg-[#1B2340]/5 flex items-center justify-center mt-3 mb-3 text-2xl">
                          🌳
                        </div>
                        <h4 className="font-serif text-base font-semibold text-[#1B2340] mb-1 line-clamp-1">
                          {project.title}
                        </h4>
                        <p className="text-[11px] text-[#6B7280] mb-2">
                          {project.createdBy?.name} · {project.organization?.name}
                        </p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0A868]/15 text-xs font-semibold text-[#B76E2A] mb-3">
                          <Star size={11} className="fill-[#F0A868] text-[#F0A868]" />
                          {project.averageRating?.toFixed(1)}
                        </span>
                        <div className="flex items-center gap-3 text-[#9CA3AF]">
                          <StatPill icon={Eye} value={project.stats?.views ?? "—"} />
                          <StatPill icon={Heart} value={project.stats?.likes ?? "—"} />
                          <StatPill icon={Download} value={project.stats?.downloads ?? "—"} />
                          <StatPill icon={MessageCircle} value={project.stats?.comments ?? "—"} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Table */}
              {rest.length > 0 && (
                <div className="rounded-2xl bg-white border border-[#E2E4EA] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wide text-[#9CA3AF] border-b border-[#E2E4EA]">
                        <th className="px-5 py-3 font-medium w-10">#</th>
                        <th className="px-3 py-3 font-medium">Project</th>
                        <th className="px-3 py-3 font-medium">Student</th>
                        <th className="px-3 py-3 font-medium hidden md:table-cell">College</th>
                        <th className="px-3 py-3 font-medium">Rating</th>
                        <th className="px-3 py-3 font-medium hidden lg:table-cell">Stats</th>
                        <th className="px-3 py-3 font-medium">Change</th>
                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rest.map((project, i) => {
                        const rank = i + 4;
                        return (
                          <tr key={project._id} className="border-b last:border-0 border-[#F0F1F3] hover:bg-[#F7F5F0]/60 transition-colors">
                            <td className="px-5 py-4 text-[#9CA3AF] font-medium">{rank}</td>
                            <td className="px-3 py-4">
                              <Link to={`/projects/${project._id}`} className="flex items-center gap-3 min-w-0">
                                <span className="w-8 h-8 rounded-lg bg-[#1B2340]/5 flex items-center justify-center text-sm shrink-0">
                                  🌱
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-2">
                                    <span className="font-medium text-[#1B2340] truncate">{project.title}</span>
                                    {project.badge && (
                                      <span className="px-2 py-0.5 rounded-full bg-[#8B7CF0]/15 text-[10px] text-[#6D5FD8] font-medium shrink-0">
                                        {project.badge}
                                      </span>
                                    )}
                                  </span>
                                </span>
                              </Link>
                            </td>
                            <td className="px-3 py-4 text-[#374151]">{project.createdBy?.name || "—"}</td>
                            <td className="px-3 py-4 text-[#6B7280] hidden md:table-cell">
                              {project.organization?.name || "—"}
                            </td>
                            <td className="px-3 py-4">
                              <span className="inline-flex items-center gap-1 text-[#1B2340] font-medium">
                                <Star size={12} className="fill-[#F0A868] text-[#F0A868]" />
                                {project.averageRating?.toFixed(1) ?? "—"}
                              </span>
                            </td>
                            <td className="px-3 py-4 hidden lg:table-cell">
                              <div className="flex items-center gap-3">
                                <StatPill icon={Eye} value={project.stats?.views ?? "—"} />
                                <StatPill icon={Heart} value={project.stats?.likes ?? "—"} />
                                <StatPill icon={Download} value={project.stats?.downloads ?? "—"} />
                                <StatPill icon={MessageCircle} value={project.stats?.comments ?? "—"} />
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <RankChange delta={project.rankChange} />
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-2 text-[#9CA3AF]">
                                <button className="p-1.5 rounded-md hover:bg-[#1B2340]/5 hover:text-[#1B2340]">
                                  <Eye size={15} />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-[#1B2340]/5 hover:text-[#1B2340]">
                                  <Bookmark size={15} />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-[#1B2340]/5 hover:text-[#1B2340]">
                                  <Share2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-6">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#E2E4EA] text-xs text-[#6B7280] disabled:opacity-40"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPagination((prev) => ({ ...prev, page: p }))}
                        className={`w-8 h-8 rounded-lg text-xs font-medium ${
                          pagination.page === p
                            ? "bg-[#1B2340] text-white"
                            : "bg-white border border-[#E2E4EA] text-[#6B7280]"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  {pagination.totalPages > 5 && <span className="text-[#9CA3AF] px-1">...</span>}
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#E2E4EA] text-xs text-[#6B7280] disabled:opacity-40"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-[#E2E4EA] p-5">
                <h3 className="flex items-center gap-2 font-serif text-base text-[#1B2340] mb-4">
                  <Trophy size={16} className="text-[#F0A868]" />
                  Top Performers
                </h3>
                {topPerformers ? (
                  <div className="space-y-4">
                    {[
                      { key: "highestRated", label: "Highest Rated", icon: Star, tone: "text-[#F0A868] bg-[#F0A868]/15" },
                      { key: "mostViewed", label: "Most Viewed", icon: Eye, tone: "text-[#4C7CF0] bg-[#4C7CF0]/10" },
                      { key: "mostLiked", label: "Most Liked", icon: Heart, tone: "text-rose-500 bg-rose-500/10" },
                      { key: "mostDownloaded", label: "Most Downloaded", icon: Download, tone: "text-emerald-600 bg-emerald-500/10" },
                    ].map(({ key, label, icon: Icon, tone }) => (
                      <div key={key} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tone}`}>
                          <Icon size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#1B2340] truncate">{label}</p>
                          <p className="text-[11px] text-[#6B7280] truncate">
                            {topPerformers[key]?.title || "—"}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#1B2340] shrink-0">
                          {topPerformers[key]?.value ?? "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#9CA3AF]">Not enough data yet.</p>
                )}
              </div>

              <div className="rounded-2xl bg-white border border-[#E2E4EA] p-5">
                <h3 className="flex items-center gap-2 font-serif text-base text-[#1B2340] mb-4">
                  <BarChart3 size={16} className="text-[#4C7CF0]" />
                  Top Categories
                </h3>
                {categories.length > 0 ? (
                  <>
                    <CategoryDonut categories={categories} />
                    <button className="w-full mt-4 py-2 rounded-lg bg-[#F7F5F0] text-xs font-medium text-[#374151] hover:bg-[#EFEDE6] transition-colors">
                      View All Categories
                    </button>
                  </>
                ) : (
                  <p className="text-xs text-[#9CA3AF]">Category breakdown coming soon.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;