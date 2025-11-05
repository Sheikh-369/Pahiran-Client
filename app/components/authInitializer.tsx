// components/AuthInitializer.tsx
'use client';

import { useEffect } from "react";
import { setUser } from "@/lib/store/auth/auth-slice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return null;
}
