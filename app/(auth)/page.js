"use client";

import Link from "next/link";

import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import Background from "@/shared/components/ui/Background";

export default function AuthPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f6f7fb]">

      {/* BACKGROUND (SVG + blobs) */}
      <Background />

      {/* CARD */}
      <Card className="relative z-10 w-full max-w-sm mx-4 text-center p-6">

        {/* LOGO */}
        <div className="mb-6">
          <div className="w-12 h-12 mx-auto bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            G
          </div>

          <h1 className="mt-3 text-lg font-semibold">
            GhestiPay
          </h1>

          <p className="text-xs text-gray-500">
            مدیریت پرداخت‌های اقساطی
          </p>
        </div>

        {/* BUTTON */}
        <Link href="/otp">
          <Button className="w-full">
            شروع
          </Button>
        </Link>

        {/* FOOTER */}
        <p className="text-[10px] text-gray-400 mt-6">
          با شروع، وارد یا ثبت‌نام می‌شوید
        </p>

      </Card>

    </div>
  );
}