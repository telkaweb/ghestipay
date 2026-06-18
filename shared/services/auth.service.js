import client from "../api/client";

export const authService = {
  login(phone) {
    return client.post("/api/auth/login", { phone });
  },

  verify({ phone, code }) {
    return client.post("/api/auth/verify", {
      phone,
      code,
      action: "login",
      device_name: "web",
    });
  },

  identify({ national_code, birth_date }) {
    return client.post("/api/kyc/identity-inquiry", {
      national_code,
      birth_date,
    });
  },

  me() {
    return client.get("/api/auth/me");
  },
};