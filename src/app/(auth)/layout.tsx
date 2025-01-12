import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { ResponsiveAuthLayout } from "@/components/layout/ResponsiveAuthLayout";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <CssBaseline />
      <ResponsiveAuthLayout>{children}</ResponsiveAuthLayout>
    </>
  );
}
