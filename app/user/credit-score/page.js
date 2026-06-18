"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/shared/components/ui/Loading";
import CreditCode from "@/app/user/components/ui/CreditScore/CreditCode";
import CreditScoreIntro from "@/app/user/components/ui/CreditScore/Intro";
import CreditScorePayment from "@/app/user/components/ui/CreditScore/Payment";
import CreditScoreResult from "@/app/user/components/ui/CreditScore/Result";
import ProgressStepper from "@/shared/components/ui/ProgressStepper";
import { useCredit } from "@/shared/hooks/useCredit";
import { useCreditStore } from "@/shared/stores/credit.store";

const CREDIT_SCORE_STEPS = ["اطلاعات", "پرداخت", "کد اعتبارسنجی", "نتیجه"];
const PAYMENT_POLL_INTERVAL = 60 * 1000;

function formatIrr(amount) {
  if (!amount) return "۵۰٬۰۰۰ تومان";

  return `${Number(amount).toLocaleString("fa-IR")} ریال`;
}

function normalizeStep(step) {
  const numericStep = Number(step || 1);
  return Math.min(Math.max(numericStep || 1, 1), CREDIT_SCORE_STEPS.length);
}

function getPaymentStatus(creditRequest) {
  if (!creditRequest) return "pending";

  const status = creditRequest.status;

  if (["pending_payment", "payment_pending"].includes(status)) {
    return "pending";
  }

  if (["paid", "payment_paid", "payment_confirmed", "pending_code", "pending_verification", "completed", "done"].includes(status)) {
    return "paid";
  }

  if (["failed", "payment_failed", "canceled", "cancelled"].includes(status)) {
    return "failed";
  }

  return "pending";
}

function hasCreditResult(creditRequest) {
  return Boolean(creditRequest?.grade || creditRequest?.score);
}

function isCreditExpired(creditRequest) {
  if (!creditRequest) return true;

  if (typeof creditRequest.is_expired === "boolean") return creditRequest.is_expired;
  if (typeof creditRequest.expired === "boolean") return creditRequest.expired;

  const expiresAt = creditRequest.expires_at || creditRequest.expired_at || creditRequest.valid_until || creditRequest.validUntil;

  if (!expiresAt) return false;

  return new Date(expiresAt).getTime() <= Date.now();
}

function hasValidPreviousCreditScore(creditRequest) {
  return hasCreditResult(creditRequest) && !isCreditExpired(creditRequest);
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [checkedLatest, setCheckedLatest] = useState(false);
  const [resultOnly, setResultOnly] = useState(false);
  const {
    getLatestCreditScore,
    createCreditScore,
    getCreditScoreDetails,
    sendVerificationCode,
    storeVerificationCode,
    generateCreditScoreResult,
  } = useCredit();
  const creditRequest = useCreditStore((s) => s.creditRequest);
  const payment = useCreditStore((s) => s.payment);

  const currentStep = resultOnly ? 4 : normalizeStep(searchParams.get("step"));
  const creditInquiryId = useMemo(() => {
    return creditRequest?.id || searchParams.get("id") || null;
  }, [creditRequest?.id, searchParams]);
  const paymentStatus = getPaymentStatus(creditRequest);

  const goToStep = (step, id = creditInquiryId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(normalizeStep(step)));

    if (id) {
      params.set("id", String(id));
    }

    router.replace(`/user/credit-score?${params.toString()}`);
  };

  useEffect(() => {
    getLatestCreditScore.mutate(undefined, {
      onSuccess: (res) => {
        const latest = res?.data?.data?.[0] || res?.data?.data;

        if (hasValidPreviousCreditScore(latest)) {
          setResultOnly(true);
          const params = new URLSearchParams();
          params.set("step", "4");
          params.set("id", String(latest.id));
          router.replace(`/user/credit-score?${params.toString()}`);
        }
      },
      onSettled: () => setCheckedLatest(true),
    });
  }, []);

  useEffect(() => {
    if (!checkedLatest || resultOnly) return;
    if (!creditInquiryId) return;
    if (creditRequest?.id === Number(creditInquiryId)) return;

    getCreditScoreDetails.mutate(creditInquiryId);
  }, [checkedLatest, resultOnly, creditInquiryId, creditRequest?.id]);

  useEffect(() => {
    if (!checkedLatest || resultOnly) return;
    if (currentStep !== 2 || !paymentStarted || !creditInquiryId) return;

    getCreditScoreDetails.mutate(creditInquiryId);

    const intervalId = setInterval(() => {
      getCreditScoreDetails.mutate(creditInquiryId);
    }, PAYMENT_POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [checkedLatest, resultOnly, currentStep, paymentStarted, creditInquiryId]);

  const handleCreateCreditScore = () => {
    createCreditScore.mutate(undefined, {
      onSuccess: (res) => {
        const request = res?.data?.data?.[0] || res?.data?.data;
        const id = request?.id;

        setPaymentStarted(false);
        goToStep(2, id);
      },
    });
  };

  const handlePay = () => {
    setPaymentStarted(true);

    if (payment?.url) {
      window.open(payment.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleRequestCode = () => {
    if (!creditInquiryId) return;

    sendVerificationCode.mutate(creditInquiryId);
  };

  const handleSubmitCode = (code) => {
    if (!creditInquiryId) {
      console.error("[CreditScore] credit inquiry id is missing; cannot store verification code");
      return;
    }

    storeVerificationCode.mutate(
      { creditInquiryId, code },
      {
        onSuccess: () => {
          generateCreditScoreResult.mutate(creditInquiryId, {
            onSettled: () => goToStep(4, creditInquiryId),
          });
        },
      },
    );
  };

  const renderStepContent = () => {
    if (resultOnly) {
      return (
        <CreditScoreResult
          status="ready"
          score={creditRequest?.grade || creditRequest?.score || undefined}
          reportDate={creditRequest?.checked_at || "امروز"}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <CreditScoreIntro
            amount={formatIrr(payment?.total || payment?.amount)}
            loading={createCreditScore.isPending}
            onContinue={handleCreateCreditScore}
          />
        );

      case 2:
        return (
          <CreditScorePayment
            amount={formatIrr(payment?.total || payment?.amount)}
            loading={getCreditScoreDetails.isPending}
            onContinue={() => goToStep(3)}
            onPay={handlePay}
            status={paymentStarted ? paymentStatus : "idle"}
          />
        );

      case 3:
        return (
          <CreditCode
            onRequestCode={handleRequestCode}
            onSubmitCode={handleSubmitCode}
            requesting={sendVerificationCode.isPending}
            submitting={storeVerificationCode.isPending || generateCreditScoreResult.isPending}
          />
        );

      case 4:
        return (
          <CreditScoreResult
            status={creditRequest?.grade || creditRequest?.score ? "ready" : "pending"}
            score={creditRequest?.grade || creditRequest?.score || undefined}
            reportDate={creditRequest?.checked_at || "امروز"}
          />
        );

      default:
        return null;
    }
  };

  if (!checkedLatest) {
    return <Loading fullscreen />;
  }

  return (
    <div className="flex w-full flex-col px-4 pt-6">
      {!resultOnly && <ProgressStepper currentStep={currentStep} steps={CREDIT_SCORE_STEPS} />}
      {renderStepContent()}
    </div>
  );
};

export default Page;
