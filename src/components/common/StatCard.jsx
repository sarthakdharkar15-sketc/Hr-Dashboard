import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  trend,
  trendType = "up", // "up" | "down"
  comparison = "vs last month",
  icon: Icon,
  accent = "violet", // "violet" | "indigo" | "cyan" | "emerald" | "amber"
  sparklineData = [12, 14, 18, 16, 21, 24, 28]
}) => {
  const getAccentStyles = () => {
    switch (accent) {
      case "indigo":
        return {
          iconBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
          glow: "group-hover:border-indigo-500/30",
          stroke: "#6366F1",
          fill: "url(#spark-indigo)"
        };
      case "cyan":
        return {
          iconBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
          glow: "group-hover:border-cyan-500/30",
          stroke: "#06B6D4",
          fill: "url(#spark-cyan)"
        };
      case "emerald":
        return {
          iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
          glow: "group-hover:border-emerald-500/30",
          stroke: "#10B981",
          fill: "url(#spark-emerald)"
        };
      case "amber":
        return {
          iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
          glow: "group-hover:border-amber-500/30",
          stroke: "#F59E0B",
          fill: "url(#spark-amber)"
        };
      case "violet":
      default:
        return {
          iconBg: "bg-violet-500/15 border-violet-500/30 text-violet-400",
          glow: "group-hover:border-violet-500/30",
          stroke: "#8B5CF6",
          fill: "url(#spark-violet)"
        };
    }
  };

  const styles = getAccentStyles();

  // Generate SVG path for sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const width = 84;
  const height = 30;
  const points = sparklineData.map((d, i) => {
    const x = (i / (sparklineData.length - 1)) * width;
    const y = height - ((d - minVal) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <div
      className={`group relative bg-[#121A2B] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 ${styles.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl font-bold text-white mt-1.5 tracking-tight font-sans">
            {value}
          </div>
        </div>
        {Icon && (
          <div
            className={`p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-105 ${styles.iconBg}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${
              trendType === "up"
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-rose-400 bg-rose-500/10"
            }`}
          >
            {trendType === "up" ? (
              <TrendingUp className="w-3 h-3 mr-0.5" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-0.5" />
            )}
            {trend}
          </span>
          <span className="text-[11px] text-slate-400">{comparison}</span>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-20 h-7 overflow-hidden shrink-0">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="spark-violet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="spark-indigo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="spark-cyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="spark-emerald" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="spark-amber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill={styles.fill} />
            <path
              d={pathD}
              fill="none"
              stroke={styles.stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
