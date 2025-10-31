"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Logged in with Google!");
      router.push("/");
    } else {
      toast.error("Google login failed");
      router.push("/auth/login");
    }
  }, [router]);

  return <p className="text-center mt-10">Logging you in...</p>;
}
