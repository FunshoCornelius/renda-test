// app/(auth)/signin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { FormInput } from "@/components/form/FormInput";
import { AuthButton } from "@/components/buttons/AuthButton";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginUserType } from "@/types/authUserType";
import { useLoginUserMutation } from "@/api/slices/authSlice";
import { sendToastNotification } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { ApiError } from "@/types/apiTypes";
import { encryptData } from "@/utils/crypto";

const initialData: LoginUserType = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = useState<LoginUserType>(initialData);
  const [errors, setErrors] = useState<LoginUserType>(initialData);
  const router = useRouter();
  const [
    loginUser,
    { isLoading: isLoggingIn, isSuccess: userIsLoggedIn, data: loginData },
  ]: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any = useLoginUserMutation();

  useEffect(() => {
    let isMounted = true;

    if (userIsLoggedIn && isMounted && loginData) {
      const token = loginData.token;
      const encryptedToken = encryptData(token);
      sessionStorage.setItem("token", encryptedToken);
      document.cookie = `token=${encryptedToken}; path=/; secure; samesite=strict`;
      router.push(`/?id=${loginData.data.id}`);
    }

    return () => {
      isMounted = false;
    };
  }, [userIsLoggedIn, loginData, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email === "") {
      setErrors({ ...errors, email: "Email is required" });
      return;
    }
    if (formData.password === "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    try {
      await loginUser(formData).unwrap();
    } catch (error: unknown) {
      const errorMessage =
        (error as ApiError)?.data?.message || "Something went wrong";
      sendToastNotification(errorMessage, "error");
    }

    setFormData(initialData);
    setErrors(initialData);
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Enter your email below to login to your account"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          error={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={() => setErrors({ ...errors, email: "" })}
          placeholder="m@example.com"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          error={errors.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          onBlur={() => setErrors({ ...errors, password: "" })}
        />

        <AuthButton disabled={isLoggingIn} type="submit">
          Login
        </AuthButton>
        {/* <AuthButton variant="outlined">Login with Google</AuthButton> */}
      </Box>

      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Don&#39;t have an account?{" "}
        <Link
          href="/signup"
          style={{ color: "#0F172A", textDecoration: "underline" }}
        >
          Sign Up
        </Link>
      </Typography>
    </AuthLayout>
  );
}
