"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth.store";

export default function ShopLayout({ children }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "shop") {
      router.replace("/user/dashboard");
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
}