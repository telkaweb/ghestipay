"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CircleAlert,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

const resultConfig = {
  idle: {
    title: "آماده ثبت ضامن",
    text: "اطلاعات ضامن را وارد کنید تا درخواست ثبت شود.",
    className: "border-slate-200 bg-slate-50 text-slate-700",
    icon: Clock3,
  },
  pending: {
    title: "در حال ثبت ضامن",
    text: "اطلاعات ضامن در حال ارسال است.",
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Clock3,
  },
  approved: {
    title: "ضامن ثبت شد",
    text: "اطلاعات ضامن با موفقیت برای این درخواست ثبت شد.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: CircleCheckBig,
  },
  rejected: {
    title: "ثبت ضامن ناموفق بود",
    text: "اطلاعات ضامن ثبت نشد. لطفا دوباره تلاش کنید.",
    className: "border-red-200 bg-red-50 text-red-800",
    icon: CircleAlert,
  },
};

export default function Guarantor({
  defaultValues = {},
  resultStatus = "idle",
  resultMessage = "",
  loading = false,
  onSubmit,
}) {
  const [values, setValues] = useState({
    mobile: defaultValues.mobile || defaultValues.phone || "",
    nationalCode: defaultValues.national_code || defaultValues.nationalCode || "",
  });

  const effectiveStatus = loading ? "pending" : resultStatus;
  const config = resultConfig[effectiveStatus] || resultConfig.idle;
  const ResultIcon = config.icon;

  const resetValues = () => {
    setValues({
      mobile: "",
      nationalCode: "",
    });
  };

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit?.(
      {
        mobile: values.mobile.trim(),
        national_code: values.nationalCode.trim(),
      },
      resetValues,
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          اطلاعات ضامن
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          شماره موبایل و کد ملی ضامن را وارد کنید تا برای این درخواست ثبت شود.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="شماره تلفن ضامن"
            type="tel"
            placeholder="09xxxxxxxxx"
            value={values.mobile}
            onChange={handleChange("mobile")}
          />

          <Field
            label="شماره ملی ضامن"
            inputMode="numeric"
            placeholder="1234567890"
            value={values.nationalCode}
            onChange={handleChange("nationalCode")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BadgeCheck size={18} />
          {loading ? "در حال ثبت اطلاعات" : "ثبت ضامن"}
        </button>
      </form>

      <div className={`rounded-2xl border p-4 ${config.className}`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <ResultIcon size={22} />
          </div>

          <div>
            <h3 className="text-sm font-bold">{config.title}</h3>
            <p className="mt-1 text-sm leading-6">
              {resultMessage || config.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
