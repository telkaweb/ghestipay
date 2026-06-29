import client from "../api/client";

export const authService = {
  login(phone) {
    return client.post("/v1/auth/otp/send", { mobile: phone });
  },

  verify({ phone, code }) {
    return client.post("/v1/auth/otp/verify", {
      mobile: phone,
      otp: code,
    });
  },

  identify({ national_code, birth_date }) {
    return client.post("/v1/kyc/verify-identity", {
      national_code,
      birth_date,
    });
  },

  me() {
    return client.get("/v1/auth/me");
  },
};