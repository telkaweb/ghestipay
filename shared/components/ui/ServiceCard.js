import Link from "next/link";

export default function ServiceCard({
  icon: Icon,
  title,
  href,
}) {
  return (
    <Link
      href={href}
      className="
        flex flex-col items-center
        gap-2
        rounded-2xl
        border border-white/30
        bg-white/60
        backdrop-blur-xl
        p-3
        active:scale-95
        transition
      "
    >
      <div
        className="
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          bg-blue-500/10
        "
      >
        <Icon
          size={22}
          className="text-blue-600"
        />
      </div>

      <span className="text-[11px] text-center">
        {title}
      </span>
    </Link>
  );
}