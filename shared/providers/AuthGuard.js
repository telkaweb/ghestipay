"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth.store";
import Loading from "../components/ui/Loading";
import { authService } from "@/shared/services/auth.service";

const USER_REFRESH_INTERVAL = 2 * 60 * 1000;
const PUBLIC_PATHS = ["/user/requests/new"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const hydrate = useAuthStore((s) => s.hydrate);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [isChecking, setIsChecking] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isFetchingUserRef = useRef(false);


  useEffect(() => {
    if (hydrated) return;

    try {
      hydrate();
    } catch (e) {
      // ignore
    }
  }, [hydrated, hydrate]);

  const fetchMe = useCallback(async ({ showLoading = false } = {}) => {
    if (!token || isFetchingUserRef.current) return;

    isFetchingUserRef.current = true;

    if (showLoading) {
      setIsChecking(true);
    }

    try {
      const res = await authService.me();
      const userData = res?.data?.data || res?.data;
      if (userData) {
        updateUser(userData);
      }
    } catch (e) {
      // If fetching /me fails (401 etc.) client interceptor handles token removal
    } finally {
      isFetchingUserRef.current = false;

      if (showLoading) {
        setIsChecking(false);
      }
    }
  }, [token, updateUser]);

  // Fetch user once after refresh/mount, then refresh it every 2 minutes.
  useEffect(() => {
    if (!hydrated || !token) return;
    if (isPublicPath) return;

    fetchMe({ showLoading: !user });

    const intervalId = setInterval(() => {
      fetchMe();
    }, USER_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
    // Do not depend on `user`; updateUser changes it and would recreate the interval.
  }, [hydrated, token, fetchMe, isPublicPath]);

  // Decide redirects only after hydration and any required /me check finished
  useEffect(() => {
    if (!hydrated) return;
    if (isChecking) return;

    const isAuthPage = pathname === "/otp";
    const isDashboard = pathname.startsWith("/user") || pathname.startsWith("/shop");

    // If not logged in but trying to access dashboard -> go to login
    if (!token && isDashboard && !isPublicPath) {
      setIsRedirecting(true);
      router.replace("/");
      return;
    }

    // If logged in and on auth page -> route to identify or dashboard
    if (token && isAuthPage) {
      setIsRedirecting(true);
      if (user?.kyc_status !== "verified") {
        router.replace("/identify");
      } else {
        router.replace("/user/dashboard");
      }
      return;
    }
  }, [hydrated, isChecking, token, user, pathname, router]);

  // Safety: if redirecting flag stays true (router.replace failed), clear after timeout
  useEffect(() => {
    if (!isRedirecting) return;
    const t = setTimeout(() => setIsRedirecting(false), 3000);
    return () => clearTimeout(t);
  }, [isRedirecting]);

  // Show loading until hydration and any check/redirect completes
  if (!hydrated || isChecking || isRedirecting) {
    return <Loading fullscreen />;
  }

  return children;
}
