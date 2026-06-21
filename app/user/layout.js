"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth.store";
import AppLayout from "./components/layout/AppLayout";

const PUBLIC_USER_PATHS = ["/user/requests/new"];

export default function UserLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isPublicPath = PUBLIC_USER_PATHS.includes(pathname);

  useEffect(() => {
    if (isPublicPath) return;
    if (!user) return;

    if (user.role === "sotre") {
      router.replace("/shop/dashboard");
    }
    if (user.role === "customer") {
      router.replace("/user/dashboard");
    }
  }, [isPublicPath, router, user]);

  if (isPublicPath) return children;

  if (!user) return null;

  return <AppLayout>
    {children}
  </AppLayout>;
}
