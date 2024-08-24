"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loading";

export default function ProtectedRoute({ children }) {
  const { user, userLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userLoaded) {
      if (!user) {
        router.push("/");
      } else {
        router.push("/posts");
      }
    }
  }, [user, userLoaded, router]);

  if (!userLoaded) {
    return <LoadingScreen />;
  }

  return children;
}
