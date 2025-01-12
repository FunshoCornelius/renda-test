"use client";

import { useGetUserQuery } from "@/api/slices/authSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import LinearDeterminate from "./Loading";
import { decryptData } from "@/utils/crypto";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const encryptedToken = sessionStorage.getItem("token");
      if (!encryptedToken) {
        router.push("/login");
        return;
      }

      const decryptedToken = decryptData(encryptedToken);
      setToken(decryptedToken);

      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      setUserId(id);
    }
  }, [router]);

  const { data: userData, isFetching, isError } = useGetUserQuery(
    userId ?? "",
    {
      skip: !userId || !token,
    }
  );

  const fullName = `${userData?.data?.first_name || ""} ${
    userData?.data?.last_name || ""
  }`;

  if (isError || !userData) {
    return <LinearDeterminate />;
  }
  return (
    <>
      {isFetching ? (
        <LinearDeterminate />
      ) : (
        <Box
          component="main"
          sx={{
            display: "grid",
            placeContent: "center",
            width: "100%",
            padding: "0 2rem",
            minHeight: "100vh",
            gap: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: "54rem",
              marginInline: "auto",
              backgroundColor: "#F8F8F8",
            }}
          >
            <Box
              component="header"
              sx={{
                background: "url('/images/mainbg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "grid",
                placeContent: "center",
                color: "white",
                textAlign: "center",
                minHeight: "40vh",
                borderRadius: "1rem",
                padding: "2rem 3rem",
                gap: "0.6rem",
              }}
            >
              <Box sx={{ display: "grid", placeContent: "center" }}>
                <Image
                  src="/images/useravatar.png"
                  alt={fullName}
                  width={94}
                  height={94}
                />
              </Box>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "2rem" }}
                variant="h1"
              >
                Welcome {fullName}
              </Typography>
              <Typography variant="body1">Super Admin</Typography>
            </Box>
            <Box sx={{ padding: "2rem 3rem" }}>
              <Typography variant="body1">
                Korem ipsum dolor sit amet, consectetur adipiscing elit., Korem
                ipsum dolor sit amet, consectetur adipiscing elit., Korem ipsum
                dolor sit amet, consectetur adipiscing elit. Korem ipsum dolor
                sit amet, consectetur adipiscing elit.,Korem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
