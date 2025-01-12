import Button from "@mui/material/Button";

interface AuthButtonProps {
  variant?: "contained" | "outlined";
  type?: "button" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export function AuthButton({
  variant = "contained",
  type = "button",
  onClick,
  fullWidth = true,
  children,
  disabled,
}: Readonly<AuthButtonProps>) {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        mt: 2,
        bgcolor: variant === "contained" ? "#0F172A" : "transparent",
        color: variant === "contained" ? "#fff" : "#0F172A",
        textTransform: "none",
        fontWeight: "500",
        border: variant === "outlined" ? "1px solid #E2E8F0" : "none",
      }}
    >
      {children}
    </Button>
  );
}
