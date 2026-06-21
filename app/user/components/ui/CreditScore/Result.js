import { AlertTriangle, CheckCircle2, Clock, FileText, ShieldCheck, TrendingUp } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";

function formatJalaliDate(value) {
  if (!value) return "امروز";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const gradeConfig = {
  A: {
    label: "عالی",
    description: "وضعیت اعتباری شما بسیار مناسب است و امکان دریافت پیشنهادهای بهتر وجود دارد.",
    className: "bg-emerald-50 text-emerald-600",
  },
  B: {
    label: "خوب",
    description: "وضعیت اعتباری شما مناسب است و می‌توانید برای دریافت اعتبار اقدام کنید.",
    className: "bg-blue-50 text-blue-600",
  },
  C: {
    label: "متوسط",
    description: "وضعیت اعتباری شما نیاز به بررسی بیشتر دارد.",
    className: "bg-amber-50 text-amber-600",
  },
  D: {
    label: "نیازمند بهبود",
    description: "برای دریافت اعتبار بهتر است وضعیت مالی و سوابق بازپرداخت خود را بهبود دهید.",
    className: "bg-red-50 text-red-600",
  },
  E: {
    label: "ضعیف",
    description: "برای دریافت اعتبار بهتر است وضعیت مالی و سوابق بازپرداخت خود را بهبود دهید.",
    className: "bg-red-50 text-red-600",
  },
};

export default function CreditScoreResult({
  status = "pending",
  score = "A",
  limit = "۱۲۰٬۰۰۰٬۰۰۰ تومان",
  reportDate = "امروز",
  onStartNew,
  startingNew = false,
  riskTitle,
  checksSummaryValue,
}) {
  const isReady = status === "ready";
  const grade = gradeConfig[score] || gradeConfig.A;
  const formattedReportDate = formatJalaliDate(reportDate);

  if (!isReady) {
    return (
      <Card className="mt-6 space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Clock size={30} />
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-900">در انتظار نتیجه اعتبارسنجی</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            کد اعتبارسنجی ثبت شد و نتیجه پس از بررسی در همین بخش نمایش داده می‌شود.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-gray-900">نتیجه اعتبارسنجی آماده است</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            گزارش اعتبارسنجی شما با موفقیت دریافت شد و خلاصه نتیجه در ادامه نمایش داده می‌شود.
          </p>
        </div>
      </div>

      <div className={`rounded-3xl p-5 text-center ${grade.className}`}>
        <p className="text-xs font-medium opacity-80">رتبه اعتباری</p>
        <p className="mt-2 text-5xl font-black leading-none">{score}</p>
        <p className="mt-2 text-sm font-bold">{riskTitle || grade.label}</p>
      </div>

      <p className="rounded-2xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
        {grade.description}
      </p>

      <div className="grid gap-3">
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp size={18} className="text-blue-600" />
            سقف پیشنهادی اعتبار
          </span>
          <span className="text-sm font-bold text-gray-900">{limit}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={18} className="text-emerald-600" />
            وضعیت گزارش
          </span>
          <span className="text-sm font-bold text-emerald-600">تایید شده</span>
        </div>

        {checksSummaryValue && (
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck size={18} className="text-blue-600" />
              وضعیت چک
            </span>
            <span className="text-sm font-bold text-gray-900">{checksSummaryValue}</span>
          </div>
        )}

        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <FileText size={18} className="text-gray-500" />
            تاریخ گزارش
          </span>
          <span className="text-sm font-bold text-gray-900">{formattedReportDate}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 p-4 text-amber-700">
        <div className="flex items-start gap-2">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p className="text-xs leading-6">
            اگر گزینه اعتبارسنجی جدید را انتخاب کنید، نتایج قبلی از این صفحه پاک می‌شود و باید هزینه اعتبارسنجی را دوباره از ابتدا پرداخت کنید.
          </p>
        </div>
      </div>

      <Button className="cursor-pointer" variant="secondary" disabled={startingNew} onClick={onStartNew}>
        {startingNew ? "در حال پاک کردن نتایج قبلی..." : "اعتبارسنجی جدید"}
      </Button>
    </Card>
  );
}






