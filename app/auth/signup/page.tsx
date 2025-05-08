"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login?signup=1");
  }, [router]);
  return null;
}
