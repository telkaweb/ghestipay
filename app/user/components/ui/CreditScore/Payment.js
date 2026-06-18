"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, CreditCard, XCircle } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";

const WAIT_SECONDS = 60;

const paymentStatusConfig = {
  idle: {
    icon: CreditCard,
    label: "آماده پرداخت",
    className: "bg-blue-50 text-blue-600",
    description: "برای شروع پرداخت، دکمه پرداخت و ادامه را انتخاب کنید.",
  },
  pending: {
    icon: Clock,
    label: "در انتظار تایید پرداخت",
    className: "bg-amber-50 text-amber-600",
    description: "برای به‌روزرسانی وضعیت پرداخت حداقل یک دقیقه منتظر بمانید.",
  },
  paid: {
    icon: CheckCircle2,
    label: "پرداخت موفق",
    className: "bg-emerald-50 text-emerald-600",
    description: "پرداخت با موفقیت ثبت شده و می‌توانید وارد مرحله دریافت کد شوید.",
  },
  failed: {
    icon: XCircle,
    label: "پرداخت ناموفق",
    className: "bg-red-50 text-red-600",
    description: "پرداخت انجام نشد. لطفاً دوباره تلاش کنید.",
  },
};

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function CreditScorePayment({
  amount = "۵۰٬۰۰۰ تومان",
  status = "idle",
  loading = false,
  onPay,
  onContinue,
}) {
  const [remainingSeconds, setRemainingSeconds] = useState(WAIT_SECONDS);
  const config = paymentStatusConfig[status] || paymentStatusConfig.idle;
  const StatusIcon = config.icon;
  const isPaid = status === "paid";
  const isPending = status === "pending";
  const isWaiting = isPending && remainingSeconds > 0;

  useEffect(() => {
    if (!isPending) {
      setRemainingSeconds(WAIT_SECONDS);
      return;
    }

    setRemainingSeconds(WAIT_SECONDS);
  }, [isPending]);

  useEffect(() => {
    if (!isPending || remainingSeconds <= 0) return;

    const timerId = setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPending, remainingSeconds]);

  return (
    <Card className="mt-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <CreditCard size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-gray-900">پرداخت اعتبارسنجی</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            پرداخت در تب جداگانه باز می‌شود. بعد از پرداخت، کمی زمان لازم است تا وضعیت آن در سامانه به‌روزرسانی شود.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">مبلغ قابل پرداخت</span>
          <span className="font-bold text-gray-900">{amount}</span>
        </div>

        <div className={`mt-4 flex items-start gap-2 rounded-xl px-3 py-2 ${config.className}`}>
          <StatusIcon size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold">{config.label}</p>
            <p className="mt-1 text-xs leading-5 opacity-80">{config.description}</p>
          </div>
        </div>

        {isWaiting && (
          <div className="mt-3 rounded-xl bg-white px-3 py-2 text-center text-xs font-bold text-gray-600">
            زمان باقی‌مانده تا بررسی دوباره پرداخت: {formatTimer(remainingSeconds)}
          </div>
        )}
      </div>

      {isPaid ? (
        <Button onClick={onContinue}>ادامه و دریافت کد</Button>
      ) : (
        <Button disabled={loading || isWaiting} onClick={onPay}>
          {isWaiting
            ? `لطفاً ${formatTimer(remainingSeconds)} منتظر بمانید`
            : loading
            ? "در حال بررسی وضعیت پرداخت..."
            : "پرداخت و ادامه"}
        </Button>
      )}
    </Card>
  );
}
