/**
 * CategoryDonut
 * Dependency-free donut chart built with a CSS conic-gradient + radial mask.
 * No charting library needed.
 *
 * Props:
 *   categories: [{ name: string, percent: number, color: string }]
 *     - percents should sum to 100 (not enforced, but expected)
 *     - color can be any valid CSS color (hex, rgb, var(--token), etc.)
 *
 * Usage:
 *   <CategoryDonut categories={[
 *     { name: "AI/ML",      percent: 35, color: "#378ADD" },
 *     { name: "Web Dev",    percent: 25, color: "#D85A30" },
 *     { name: "Blockchain", percent: 15, color: "#1D9E75" },
 *     { name: "IoT",        percent: 10, color: "#7F77DD" },
 *     { name: "Others",     percent: 15, color: "#888780" },
 *   ]} />
 */
const CategoryDonut = ({ categories, size = 112, thickness = 18 }) => {
  if (!categories || categories.length === 0) return null;

  let cumulative = 0;
  const stops = categories
    .map((c) => {
      const start = cumulative;
      cumulative += c.percent;
      return `${c.color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  const maskStyle = {
    WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness - 1}px))`,
    mask: `radial-gradient(farthest-side, transparent calc(100% - ${thickness}px), #000 calc(100% - ${thickness - 1}px))`,
  };

  return (
    <div className="flex items-center gap-6">
      <div
        className="rounded-full shrink-0"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${stops})`,
          ...maskStyle,
        }}
        role="img"
        aria-label={`Category breakdown: ${categories.map((c) => `${c.name} ${c.percent}%`).join(", ")}`}
      />
      <div className="flex-1 space-y-2">
        {categories.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-[#1B2340]">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: c.color }}
              />
              {c.name}
            </span>
            <span className="text-[#6B7280] font-medium">{c.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDonut;