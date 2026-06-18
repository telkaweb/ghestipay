"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import Background from "@/shared/components/ui/Background";
import { useAuth } from "@/shared/hooks/useAuth";

// Validation Schemas
const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
});

const codeValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required("کد تایید الزامی است")
    .matches(/^\d{6}$/, "کد باید 6 رقم باشد"),
});

export default function OtpPage() {
  const router = useRouter();
  const { login, verify } = useAuth();

  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(120);
  const [serverError, setServerError] = useState("");

  // Formik for Phone Step
  const phoneFormik = useFormik({
    initialValues: { phone: "" },
    validationSchema: phoneValidationSchema,
    onSubmit: (values) => {
      setServerError("");
      login.mutate(values.phone, {
        onSuccess: () => {
          setStep(2);
          setTimer(120);
        },
        onError: (error) => {
          const message = error?.response?.data?.message || "خطا در ارسال کد";
          setServerError(message);
        },
      });
    },
  });

  // Formik for Code Step
  const codeFormik = useFormik({
    initialValues: { code: "" },
    validationSchema: codeValidationSchema,
    onSubmit: (values) => {
      setServerError("");
      verify.mutate(
        {
          phone: phoneFormik.values.phone,
          code: values.code,
        },
        {
          onSuccess: () => {
            // redirect handled inside useAuth (role based)
          },
          onError: (error) => {
            const message = error?.response?.data?.message || "کد تایید نامعتبر است";
            setServerError(message);
          },
        }
      );
    },
  });

  // Countdown Timer
  useEffect(() => {
    if (step !== 2) return;
    if (timer === 0) return;

    const t = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [timer, step]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResendOtp = () => {
    setTimer(120);
    phoneFormik.handleSubmit();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f6f7fb] overflow-hidden">

      {/* BACKGROUND */}
      <Background />

      {/* CARD */}
      <Card className="relative z-10 w-full max-w-sm mx-4 p-6">

        {/* GENERAL ERROR ALERT */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={phoneFormik.handleSubmit} className="space-y-4">

            <div className="text-center">
              <h1 className="text-lg font-semibold">
                ورود به اپلیکیشن
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                شماره موبایل خود را وارد کنید
              </p>
            </div>

            <Input
              label="شماره موبایل"
              type="tel"
              placeholder="09xxxxxxxxx"
              {...phoneFormik.getFieldProps("phone")}
              error={
                phoneFormik.touched.phone && phoneFormik.errors.phone
                  ? phoneFormik.errors.phone
                  : ""
              }
            />

            <Button
              type="submit"
              disabled={login.isPending}
            >
              {login.isPending ? "در حال ارسال..." : "دریافت کد"}
            </Button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={codeFormik.handleSubmit} className="space-y-4 text-center">

            <div>
              <h1 className="text-lg font-semibold">
                تایید کد
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                ارسال شده به {phoneFormik.values.phone}
              </p>
            </div>

            {/* edit phone */}
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setServerError("");
                codeFormik.resetForm();
              }}
              className="text-xs text-blue-600 cursor-pointer hover:underline"
            >
              ویرایش شماره
            </button>

            <Input
              type="text"
              placeholder="کد 6 رقمی"
              {...codeFormik.getFieldProps("code")}
              error={
                codeFormik.touched.code && codeFormik.errors.code
                  ? codeFormik.errors.code
                  : ""
              }
            />

            {/* TIMER */}
            <div className="text-xs text-gray-500 px-[10px]">
              {timer > 0 ? (
                <>ارسال مجدد تا {formatTime(timer)}</>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 px-[10px] hover:underline"
                  disabled={login.isPending}
                >
                  {login.isPending ? "درحال ارسال..." : "ارسال مجدد کد"}
                </button>
              )}
            </div>

            {/* VERIFY */}
            <Button
              type="submit"
              disabled={verify.isPending}
            >
              {verify.isPending ? "در حال بررسی..." : "تایید و ورود"}
            </Button>

          </form>
        )}

      </Card>
    </div>
  );
}