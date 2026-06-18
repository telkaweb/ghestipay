import { ShieldCheck, CreditCard, Info } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";

export default function CreditScoreIntro({
  amount = "۵۰٬۰۰۰ تومان",
  onContinue,
  loading = false,
}) {
  return (
    <Card className="mt-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ShieldCheck size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-gray-900">اعتبارسنجی</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            با انجام اعتبارسنجی، وضعیت اعتباری شما بررسی می‌شود و نتیجه آن برای ادامه فرایند دریافت اعتبار نمایش داده می‌شود.
          </p>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-medium">
            <CreditCard size={18} className="text-blue-600" />
            هزینه اعتبارسنجی
          </span>
          <span className="font-bold text-gray-900">{amount}</span>
        </div>

        <div className="flex items-start gap-2 text-xs leading-6 text-gray-500">
          <Info size={16} className="mt-1 shrink-0 text-amber-500" />
          <span>
            در صورت تمایل به انجام اعتبارسنجی، دکمه ادامه را انتخاب کنید تا وارد مرحله بعد شوید.
          </span>
        </div>
      </div>

      <Button disabled={loading} onClick={onContinue}>
        {loading ? "در حال پردازش..." : "ادامه "}
      </Button>
    </Card>
  );
}
