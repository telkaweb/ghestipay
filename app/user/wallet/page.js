"use client";

import { useState } from "react";
import { ArrowDownToLine, Plus, WalletCards } from "lucide-react";
import { useAuthStore } from "@/shared/stores/auth.store";

const QUICK_CHARGE_AMOUNTS = [100000, 200000, 500000];

function normalizeDigits(value) {
  return String(value || "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function formatNumber(value) {
  const numericValue = normalizeDigits(value).replace(/\D/g, "");

  if (!numericValue) return "";

  return Number(numericValue).toLocaleString("fa-IR");
}

function formatAmount(value) {
  const numericValue = Number(value || 0);

  return `${numericValue.toLocaleString("fa-IR")} تومان`;
}

export default function WalletPage() {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const user = useAuthStore((s) => s.user);
  const balance =
    user?.wallet_balance ??
    user?.walletBalance ??
    user?.balance ??
    0;

  const handleIncreaseCredit = () => {
    setIsChargeModalOpen(true);
  };

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleChargeAmountChange = (event) => {
    setChargeAmount(normalizeDigits(event.target.value).replace(/\D/g, ""));
  };

  const handleWithdrawAmountChange = (event) => {
    setWithdrawAmount(normalizeDigits(event.target.value).replace(/\D/g, ""));
  };

  const handlePay = () => {
    // TODO: connect to wallet charge payment flow when the API/payment route is ready.
  };

  const handleWithdrawSubmit = () => {
    // TODO: connect to wallet withdrawal flow when the API is ready.
  };

  const normalizedChargeAmount = Number(chargeAmount || 0);
  const normalizedWithdrawAmount = Number(withdrawAmount || 0);

  return (
    <div className="flex flex-col gap-5 pt-6">
      <div className="space-y-2">
        <h1 className="text-lg font-black text-gray-900">کیف پول</h1>
        <p className="text-sm leading-6 text-gray-500">
          موجودی و عملیات مالی کیف پول شما
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">موجودی کیف پول</p>
            <p className="text-2xl font-black leading-8 text-blue-600">
              {formatAmount(balance)}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <WalletCards size={26} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleIncreaseCredit}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 transition active:scale-[0.98] cursor-pointer"
        >
          <Plus size={18} />
          افزایش اعتبار
        </button>

        <button
          type="button"
          onClick={handleWithdraw}
          className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 transition active:scale-[0.98]  cursor-pointer"
        >
          <ArrowDownToLine size={18} />
          برداشت
        </button>
      </section>

      {isChargeModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  افزایش اعتبار
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  مبلغ شارژ کیف پول را انتخاب یا وارد کنید.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsChargeModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {QUICK_CHARGE_AMOUNTS.map((amount) => {
                const isSelected = normalizedChargeAmount === amount;

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setChargeAmount(String(amount))}
                    className={`rounded-xl border px-2 py-3 text-xs font-bold transition active:scale-[0.98] ${
                      isSelected
                        ? "border-blue-200 bg-blue-50 text-blue-600"
                        : "border-gray-100 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {amount.toLocaleString("fa-IR")} تومان
                  </button>
                );
              })}
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-bold text-gray-700">
                مبلغ دلخواه
              </span>
              <input
                dir="ltr"
                inputMode="numeric"
                value={formatNumber(chargeAmount)}
                onChange={handleChargeAmountChange}
                placeholder="مثلاً 300000"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <button
              type="button"
              onClick={handlePay}
              disabled={!normalizedChargeAmount}
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-50"
            >
              پرداخت
            </button>
          </div>
        </div>
      )}

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-gray-900">برداشت</h2>
                <p className="mt-1 text-xs text-gray-500">
                  می‌توانید کل موجودی یا مبلغ دلخواه را برداشت کنید.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600"
              >
                ×
              </button>
            </div>

            <button
              type="button"
              onClick={() => setWithdrawAmount(String(balance))}
              className={`w-full rounded-xl border px-4 py-3 text-sm font-bold transition active:scale-[0.98] ${
                normalizedWithdrawAmount === Number(balance || 0)
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-gray-100 bg-gray-50 text-gray-700"
              }`}
            >
              برداشت کل موجودی ({formatAmount(balance)})
            </button>

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-bold text-gray-700">
                مبلغ دلخواه
              </span>
              <input
                dir="ltr"
                inputMode="numeric"
                value={formatNumber(withdrawAmount)}
                onChange={handleWithdrawAmountChange}
                placeholder="مثلاً 100000"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <button
              type="button"
              onClick={handleWithdrawSubmit}
              disabled={!normalizedWithdrawAmount}
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-50"
            >
              ثبت برداشت
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
