import { useMutation } from "@tanstack/react-query";
import { creditService } from "../services/credit.service";
import { useCreditStore } from "../stores/credit.store";

function extractCreditRequest(res) {
  return res?.data?.data?.[0] || res?.data?.data || null;
}

export function useCredit() {
  const setCreditRequest = useCreditStore((s) => s.setCreditRequest);

  const updateCreditStore = (res) => {
    const request = extractCreditRequest(res);
    const message = res?.data?.message || "";

    if (request) {
      setCreditRequest({ request, message });
    }
  };

  const getLatestCreditScore = useMutation({
    mutationFn: () => creditService.latest(),
    onSuccess: updateCreditStore,
  });

  const createCreditScore = useMutation({
    mutationFn: () => creditService.create(),
    onSuccess: updateCreditStore,
  });

  const getCreditScoreDetails = useMutation({
    mutationFn: (creditInquiryId) => creditService.details(creditInquiryId),
    onSuccess: updateCreditStore,
  });

  const sendVerificationCode = useMutation({
    mutationFn: (creditInquiryId) => creditService.sendVerificationCode(creditInquiryId),
    onSuccess: updateCreditStore,
  });

  const storeVerificationCode = useMutation({
    mutationFn: ({ creditInquiryId, code }) => creditService.storeVerificationCode({ creditInquiryId, code }),
    onSuccess: updateCreditStore,
  });

  const generateCreditScoreResult = useMutation({
    mutationFn: (creditInquiryId) => creditService.result(creditInquiryId),
    onSuccess: updateCreditStore,
  });

  return {
    getLatestCreditScore,
    createCreditScore,
    getCreditScoreDetails,
    sendVerificationCode,
    storeVerificationCode,
    generateCreditScoreResult,
  };
}
