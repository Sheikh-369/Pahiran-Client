"use client";

import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const user = useAppSelector((state) => state.authSlice.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // If user not logged in, redirect to login
      router.replace("/auth/login");
    }
  }, [user, router]);

  // Prevent rendering until user is verified
  if (!user) return null;

  return <>{children}</>;
}
