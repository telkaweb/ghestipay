"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/shared/stores/auth.store";

export default function AuthHydrator({ children }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    hydrate();
  }, []);

  return children;
}