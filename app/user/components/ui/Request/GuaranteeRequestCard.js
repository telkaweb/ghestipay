"use client";

import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  CircleX,
  ArrowLeft,
  Store,
  UserRound,
  CheckCircle2,
} from "lucide-react";

function getGuaranteeStatusClass(status) {
  if (status === "پذیرفته شده" || status === "تایید شده") {
    return "bg-emerald-50 text-emerald-600";
  }
  if (status === "رد شده") return "bg-red-50 text-red-600";
  if (status === "دعوت شده") return "bg-amber-50 text-amber-600";

  return "bg-blue-50 text-blue-600";
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-gray-500">
        <Icon size={17} />
        {label}
      </span>
      <span className="text-left font-bold text-gray-900">{value}</span>
    </div>
  );
}

function GuaranteeRequestCard({
  request,
  onAccept,
  onReject,
  continueHref,
}) {
  const canAct = request.nextStep === "accept_or_reject";
  const showContinue =
    request.nextStep && request.nextStep !== "accept_or_reject" && request.status !== "rejected";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">کد درخواست ضمانت</p>
            <p className="mt-1 text-sm font-black text-gray-900">{request.id}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${getGuaranteeStatusClass(
              request.displayStatus || request.status,
            )}`}
          >
            {request.displayStatus || request.status}
          </span>
        </div>

        <div className="grid gap-3 text-sm">
          <InfoRow icon={CalendarDays} label="تاریخ دعوت" value={request.date} />
          <InfoRow
            icon={CircleDollarSign}
            label="مبلغ ضمانت"
            value={request.guaranteeAmount}
          />
          <InfoRow
            icon={CircleDollarSign}
            label="مبلغ فاکتور"
            value={request.invoiceAmount}
          />
          <InfoRow icon={Store} label="فروشگاه" value={request.storeTitle} />
          <InfoRow
            icon={UserRound}
            label="درخواست‌دهنده"
            value={`${request.customerName} - ${request.customerMobile}`}
          />
        </div>

        <div className="rounded-2xl bg-gray-50 p-3 text-xs leading-6 text-gray-600">
          درخواست اقساطی مرتبط:{" "}
          <span className="font-bold text-gray-900">
            {request.installmentTrackingCode}
          </span>
        </div>

        {request.nextStep === "accept_or_reject" && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-3 text-xs leading-6 text-amber-700">
            این درخواست در انتظار تایید یا رد شماست.
          </div>
        )}

        {request.rejectReason && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-xs leading-6 text-red-600">
            {request.rejectReason}
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          {canAct && (
            <>
              <button
                type="button"
                onClick={() => onAccept?.(request)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <CheckCircle2 size={18} />
                تایید و ادامه
              </button>
              <button
                type="button"
                onClick={() => onReject?.(request)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <CircleX size={18} />
                رد درخواست
              </button>
            </>
          )}

          {showContinue && continueHref && (
            <Link
              href={continueHref}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
            >
              ادامه فرایند
              <ArrowLeft size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuaranteeRequestCard;
