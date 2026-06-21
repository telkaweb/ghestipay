"use client";

import Link from "next/link";
import { AlertTriangle, CalendarDays, ChevronLeft, PackageCheck, ReceiptText, ShieldCheck } from "lucide-react";

function getStatusClass(status) {
  if (status === "تایید شده") return "bg-emerald-50 text-emerald-600";
  if (["رد شده", "لغو شده"].includes(status)) return "bg-red-50 text-red-600";
  if (status === "در انتظار پرداخت") return "bg-amber-50 text-amber-600";
  return "bg-blue-50 text-blue-600";
}

function getAction(request, returnQuery = "") {
  if (request.status === "تایید شده") {
    return {
      href: `/user/requests/${request.id}${returnQuery}`,
      label: "جزئیات",
      className: "bg-gray-50 text-gray-700 hover:bg-gray-100",
    };
  }

  if (request.status === "در حال بررسی") {
    return {
      href: `/user/requests/${request.id}/continue${returnQuery}`,
      label: "ادامه",
      className: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    };
  }

  return null;
}

export default function RequestCard({ request, returnQuery = "" }) {
  const action = getAction(request, returnQuery);
  const rejectionReason = request.rejectionReason || request.cancelReason || "درخواست شما به دلیل عدم تایید اطلاعات ثبت‌شده رد شده است.";
  const shouldShowReason = ["رد شده", "لغو شده"].includes(request.status);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-32 text-gray-50"
        fill="none"
        viewBox="0 0 160 160"
        aria-hidden="true"
      >
        <circle cx="128" cy="24" r="54" stroke="currentColor" strokeWidth="18" />
        <path d="M16 132C44 92 78 92 136 118" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
        <path d="M22 42H92" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      </svg>

      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-700">
            <ReceiptText size={20} />
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(request.status)}`}>
            {request.status}
          </span>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-gray-500">
              <CalendarDays size={17} />
              تاریخ درخواست
            </span>
            <span className="font-bold text-gray-900">{request.date}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-gray-500">
              <ShieldCheck size={17} />
              مبلغ کل اقساط
            </span>
            <span className="font-bold text-gray-900">{request.installmentsTotal}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-gray-500">
              <PackageCheck size={17} />
              تعداد کالای درخواست
            </span>
            <span className="font-bold text-gray-900">{request.itemsCount} کالا</span>
          </div>
        </div>

        {shouldShowReason && (
          <div className="flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-red-600">
            <AlertTriangle size={17} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-6">{rejectionReason}</p>
          </div>
        )}

        {action && (
          <Link
            href={action.href}
            className={`inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition ${action.className}`}
          >
            {action.label}
            <ChevronLeft size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}

