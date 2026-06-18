"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth.store";
import AppLayout from "./components/layout/AppLayout";

export default function UserLayout({ children }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    if (user.role === "sotre") {
      router.replace("/shop/dashboard");
    }
    if (user.role === "customer") {
      router.replace("/user/dashboard");
    }
  }, [user]);

  if (!user) return null;

  return <AppLayout>
    {children}
  </AppLayout>;
}