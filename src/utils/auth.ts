import { encryptData } from "./crypto";

export const setAuthToken = (token: string) => {
  const encryptedToken = encryptData(token);
  sessionStorage.setItem("token", encryptedToken);
  document.cookie = `token=${encryptedToken}; path=/; secure; samesite=strict`;
};

export const getAuthToken = () => {
  return (
    sessionStorage.getItem("token") ??
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
  );
};
