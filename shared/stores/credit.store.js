import { create } from "zustand";

export const useCreditStore = create((set) => ({
  creditRequest: null,
  payment: null,
  message: "",

  setCreditRequest: ({ request, message }) => {
    set({
      creditRequest: request,
      payment: request?.payment || null,
      message: message || "",
    });
  },

  clearCreditRequest: () => {
    set({
      creditRequest: null,
      payment: null,
      message: "",
    });
  },
}));
