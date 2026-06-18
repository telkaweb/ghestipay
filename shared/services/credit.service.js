import client from "../api/client";

export const creditService = {
  create() {
    return client.post("/api/kyc/credit-score/create");
  },

  latest() {
    return client.get("/api/kyc/credit-score/latest");
  },

  details(creditInquiryId) {
    return client.get(`/api/kyc/credit-score/${creditInquiryId}`);
  },

  sendVerificationCode(creditInquiryId) {
    return client.post(`/api/kyc/credit-score/${creditInquiryId}/send-verification-code`);
  },

  storeVerificationCode({ creditInquiryId, code }) {
    return client.post(`/api/kyc/credit-score/${creditInquiryId}/store-verification-code`, {
      code,
    });
  },

  result(creditInquiryId) {
    return client.get(`/api/kyc/credit-score/${creditInquiryId}/result`);
  },
};
