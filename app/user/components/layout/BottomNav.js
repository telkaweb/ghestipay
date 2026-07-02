"use client";

import {
  Home,
  Calculator,
  User,
  ClipboardList,
  Grid2X2,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/user/calculator", icon: Calculator, label: "محاسبه‌گر" },
    { href: "/user/requests", icon: ClipboardList, label: "درخواست‌ها" },
    { href: "/user/dashboard", icon: Home, label: "خانه", center: true },
    { href: "/user/services", icon: Grid2X2, label: "خدمات" },
    { href: "/user/profile", icon: User, label: "پروفایل" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3">
      <nav className="w-full max-w-md">
        <div
          className="
            relative h-[78px] rounded-[30px]
            border border-white/50
            bg-white/55
            px-2
            shadow-[0_18px_45px_rgba(15,23,42,0.12)]
            backdrop-blur-2xl
            before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-white/70
            after:pointer-events-none after:absolute after:inset-0 after:rounded-[30px] after:ring-1 after:ring-black/[0.03]
          "
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-14 rounded-full bg-gradient-to-r from-sky-500/8 via-blue-500/6 to-cyan-400/8 blur-2xl" />

          <div className="relative grid h-full grid-cols-5 items-end">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.center) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center justify-center -translate-y-5"
                  >
                    <div
                      className={`
                        relative flex h-14 w-14 items-center justify-center rounded-full
                        transition-all duration-200 active:scale-95
                        ${
                          isActive
                            ? `
                              border border-sky-500/20
                              bg-zinc-950 text-white
                              shadow-[0_14px_35px_rgba(15,23,42,0.28)]
                              ring-4 ring-white/65
                            `
                            : `
                              border border-white/70
                              bg-white/65 text-zinc-700
                              shadow-[0_10px_30px_rgba(15,23,42,0.10)]
                              ring-4 ring-white/50
                              backdrop-blur-xl
                            `
                        }
                      `}
                    >
                      <div
                        className={`
                          pointer-events-none absolute inset-0 rounded-full
                          ${
                            isActive
                              ? "bg-gradient-to-br from-sky-400/18 via-transparent to-cyan-300/14"
                              : "bg-gradient-to-br from-white/40 via-transparent to-sky-100/30"
                          }
                        `}
                      />

                      <Icon size={22} className="relative z-[1]" />
                    </div>

                    <span
                      className={`
                        mt-2.5 text-[10px] font-medium transition-colors
                        ${isActive ? "text-zinc-900" : "text-zinc-500"}
                      `}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-1 -translate-y-3"
                >
                  <div
                    className={`
                      flex h-10 items-center justify-center
                      transition-colors duration-200
                      ${isActive ? "text-amber-600" : "text-zinc-500"}
                    `}
                  >
                    <Icon size={19} />
                  </div>

                  <span
                    className={`
                      text-[10px] font-medium transition-colors
                      ${isActive ? "text-amber-600" : "text-zinc-500"}
                    `}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}