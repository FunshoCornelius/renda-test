import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: Readonly<AuthLayoutProps>) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h2" fontWeight="bold" fontSize={30}>
          {title}
        </Typography>
        <Typography variant="body1" fontSize={16}>
          {subtitle}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
