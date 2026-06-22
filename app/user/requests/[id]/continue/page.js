"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import CheckRegistration from "@/app/user/components/ui/Request/CheckRegistration";
import DownPayment from "@/app/user/components/ui/Request/DownPayment";
import ESign from "@/app/user/components/ui/Request/ESign";
import Guarantor from "@/app/user/components/ui/Request/Guarantor";
import PaymentInfo from "@/app/user/components/ui/Request/PaymentInfo";
import RequestIntro from "@/app/user/components/ui/Request/RequestIntro";
import RequiredMents from "@/app/user/components/ui/Request/RequiredMents";
import WaitingPage from "@/app/user/components/ui/Request/WaitingPage";
import Loading from "@/shared/components/ui/Loading";
import ProgressStepper from "@/shared/components/ui/ProgressStepper";
import { useGetOrderDetails } from "@/shared/hooks/useInstallment";
import { useInstallmentStore } from "@/shared/stores/installment.store";

const REQUEST_STEPS = [
  "راهنما",
  "الزامات",
  "پرداخت",
  "پیش‌پرداخت",
  "ضامن",
  "ثبت چک",
  "بررسی",
  "امضا",
];

// Keep the step query param inside the valid wizard range.
function normalizeStep(step) {
  const numericStep = Number(step || 1);
  return Math.min(Math.max(numericStep || 1, 1), REQUEST_STEPS.length);
}

export default function ContinueRequestPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id;

  // Store a copy of request details so child steps and other pages can reuse it.
  const storedOrderDetails = useInstallmentStore((s) => s.orderDetails);
  const setOrderDetails = useInstallmentStore((s) => s.setOrderDetails);

  console.log('stored order detail',storedOrderDetails?.status)

  // The first page action is loading the latest request details from the API.
  const {
    data: orderDetailsResponse,
    isLoading: isOrderDetailsLoading,
    isError: isOrderDetailsError,
    refetch: refetchOrderDetails,
  } = useGetOrderDetails(orderId);

  // API responses may be wrapped differently; normalize them before use.
  const fetchedOrderDetails =
    orderDetailsResponse?.data?.data || orderDetailsResponse?.data || null;
  const orderDetails = fetchedOrderDetails || storedOrderDetails;
  const currentStep = normalizeStep(searchParams.get("step"));
  const isLastStep = currentStep === REQUEST_STEPS.length;

  // Sync fresh API data into Zustand for the rest of the installment flow.
  useEffect(() => {
    if (!fetchedOrderDetails) return;

    setOrderDetails(fetchedOrderDetails);
  }, [fetchedOrderDetails, setOrderDetails]);

  // Keep navigation state in the URL so refresh/back keeps the current step.
  const goToStep = (step) => {
    const nextStep = normalizeStep(step);
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("step", String(nextStep));

    router.replace(`/user/requests/${params.id}/continue?${nextParams.toString()}`);
  };

  // Last step returns the user to the request details page instead of advancing.
  const handleNext = () => {
    if (isLastStep) {
      router.replace(`/user/requests/${params.id}`);
      return;
    }

    goToStep(currentStep + 1);
  };

  // Each wizard step receives the same request details and decides what it needs.
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <RequestIntro orderDetails={orderDetails} />;

      case 2:
        return <RequiredMents orderDetails={orderDetails} />;

      case 3:
        return <PaymentInfo orderDetails={orderDetails} showConfirmButton={false} />;

      case 4:
        return <DownPayment orderDetails={orderDetails} paymentUrl="#" />;

      case 5:
        return <Guarantor orderDetails={orderDetails} />;

      case 6:
        return <CheckRegistration orderDetails={orderDetails} />;

      case 7:
        return <WaitingPage orderDetails={orderDetails} />;

      case 8:
        return <ESign orderDetails={orderDetails} />;

      default:
        return null;
    }
  };

  if (isOrderDetailsLoading) {
    return <Loading message="در حال دریافت جزئیات درخواست..." />;
  }

  if (isOrderDetailsError) {
    return (
      <div className="flex w-full flex-col px-4 pb-8 pt-6">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
          <h1 className="text-base font-bold text-red-700">
            دریافت جزئیات درخواست ناموفق بود
          </h1>
          <p className="mt-2 text-sm leading-6 text-red-600">
            لطفا دوباره تلاش کنید.
          </p>
          <button
            type="button"
            onClick={() => refetchOrderDetails()}
            className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col px-4 pb-8 pt-6">
      <ProgressStepper currentStep={currentStep} steps={REQUEST_STEPS} />

      <div className="mt-2">{renderStepContent()}</div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
        >
          {isLastStep ? "پایان فرایند" : "مرحله بعد"}
        </button>
      </div>
    </div>
  );
}
