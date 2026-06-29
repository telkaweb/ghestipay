import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const updateUser = useAuthStore((s) => s.updateUser);

  // STEP 1: SEND OTP
  const login = useMutation({
    mutationFn: (phone) => authService.login(phone),
  });

  // STEP 2: VERIFY OTP
  const verify = useMutation({
    mutationFn: ({ phone, code }) =>
      authService.verify({ phone, code }),

    onSuccess: (res) => {
      const data = res.data.data;

      const user = data.user;
      const token = data.access_token;

      // save globally
      setAuth({ user, token });

      // redirect by role
      if (user.role === "shop") {
        router.push("/shop/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    },
  });

  const identify = useMutation({
    mutationFn: ({ national_code, birth_date }) =>
      authService.identify({ national_code, birth_date }),
    onSuccess: async () => {
      const response = await authService.me();
      const userData = response?.data?.data || response?.data;

      if (userData) {
        updateUser(userData);
        const destination = userData.role === "shop" ? "/shop/dashboard" : "/user/dashboard";
        router.push(destination);
      }
    },
  });

  return {
    login,
    verify,
    identify,
  };
}