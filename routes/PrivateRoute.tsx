import React from "react";
import { useGetUserQuery } from "@/store/api/userApi";
import { Redirect } from "expo-router";
import LoaderUI from "@/components/ui/loader/LoaderUI";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userRes, isLoading, isError, error } = useGetUserQuery();
  const user = userRes?.data;
  console.log("User from the private route: ", user)

  // 🔄 Loading state
  if (isLoading) {
    return <LoaderUI />;
  }

  // ❌ Only redirect if it's really UNAUTHORIZED
  if (
    isError &&
    typeof error === "object" &&
    "status" in error &&
    error.status === 401
  ) {
    return <Redirect href="/auth/sign_in" />;
  }

  // ❌ No user after loading
  if (!user?._id) {
    return <Redirect href="/auth/sign_in" />;
  }

  // ✅ User is authenticated
  return <>{children}</>;
}