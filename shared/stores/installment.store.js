import { create } from "zustand";

export const useInstallmentStore = create((set) => ({
  orderDetails: null,

  setOrderDetails: (orderDetails) => {
    set({ orderDetails: orderDetails[0] });
  },

  clearOrderDetails: () => {
    set({ orderDetails: null });
  },
}));
