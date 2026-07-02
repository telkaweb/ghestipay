"use client";

import Link from "next/link";

const accentMap = {
  blue: {
    orb: "bg-blue-500/10",
    icon: "bg-blue-50 text-blue-600",
  },
  violet: {
    orb: "bg-violet-500/10",
    icon: "bg-violet-50 text-violet-600",
  },
  emerald: {
    orb: "bg-emerald-500/10",
    icon: "bg-emerald-50 text-emerald-600",
  },
  amber: {
    orb: "bg-amber-500/10",
    icon: "bg-amber-50 text-amber-600",
  },
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  accent = "blue",
}) {
  const style = accentMap[accent] || accentMap.blue;

  return (
    <Link
      href={href}
      className="
        group relative overflow-hidden
        rounded-3xl border border-zinc-200/80
        bg-white/90 p-4
        shadow-[0_10px_30px_rgba(24,24,27,0.05)]
        transition-all duration-200
        active:scale-[0.985]
      "
    >
      {/* ambient accent */}
      <div
        className={`
          pointer-events-none absolute -right-6 -top-6
          h-24 w-24 rounded-full blur-2xl
          ${style.orb}
        `}
      />

      <div className="relative flex flex-col">
        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-2xl
            ${style.icon}
          `}
        >
          <Icon size={22} />
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-bold text-zinc-900">
            {title}
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}