import { toast } from "react-toastify";

export function sendToastNotification(
  message: string,
  type: "success" | "error"
) {
  if (type === "success") {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
  } else {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
  }
}

export const getToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
};
