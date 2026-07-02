"use client";

import Link from "next/link";
import { useAuthStore } from "@/shared/stores/auth.store";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export default function VerificationStatusCard() {
  const user = useAuthStore((s) => s.user);

  const fullName = [user?.name, user?.family].filter(Boolean).join(" ");

  return (
    <div
      dir="rtl"
      className="
        relative mt-4 overflow-hidden
        rounded-3xl
        border border-zinc-200/70
        bg-white
        shadow-[0_18px_50px_rgba(0,0,0,0.06)]
      "
    >
      {/* BACKGROUND SVG (soft & minimal) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.10]"
        viewBox="0 0 400 200"
        fill="none"
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="400" y2="200">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        <circle cx="80" cy="60" r="70" fill="url(#g)" opacity="0.25" />
        <circle cx="330" cy="140" r="90" fill="url(#g)" opacity="0.18" />

        <path
          d="M0 120C90 70 170 180 260 120C320 90 360 110 400 85"
          stroke="url(#g)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative p-5">
        {/* ICON + MESSAGE */}
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl
              bg-emerald-50 text-emerald-600
            "
          >
            <ShieldCheck size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900">
              {fullName} عزیز
            </p>

            <p className="mt-1 text-xs leading-6 text-zinc-500">
              احراز هویت شما با موفقیت انجام شد و در ادامه می‌توانید از تمامی امکانات استفاده کنید.
            </p>
          </div>
        </div>

        {/* CTA TEXT LINK */}
        <div className="mt-4 flex justify-start">
          <Link
            href="/user/profile"
            className="
              inline-flex items-center gap-1
              text-sm font-medium text-zinc-900
              hover:opacity-70 transition
              active:scale-[0.98]
            "
          >
            مشاهده پروفایل
            <ChevronLeft className="h-4 w-4 text-zinc-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}