"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import type { ReactNode } from "react";

const listBenefits = [
  "Access to mentors anytime",
  "Top rated mentors in their fields",
  "Top rated mentors and seniors in their fields",
];

export function ResponsiveAuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", padding: { xs: 1, sm: 2 } }}
    >
      {!isMobile && (
        <Box
          component="aside"
          sx={{
            backgroundImage: "url(/images/authbg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: { sm: "50%", md: "40%", lg: "35%" },
            display: "flex",
            color: "white",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: {
              sm: "6rem 1.5rem 2rem",
              md: "8rem 1.5rem 2.5rem",
              lg: "10rem 1.5rem 3rem",
            },
            borderRadius: "1rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 700,
                marginBottom: 2,
              }}
              variant="h1"
            >
              Transform your potential today.
            </Typography>
            <Typography variant="body1">
              Become the best version of yourself by accessing to the
              perspectives and life experiences of others who&#39;ve been there,
              done that.
            </Typography>
          </Box>
          <Box>
            <Box>
              <AvatarGroup sx={{ display: "flex", justifyContent: "start" }}>
                <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                <Avatar alt="Remy Sharp" src="/images/avatar.png" />
              </AvatarGroup>
              <Typography variant="body1">
                Join our community of +10,000 members
              </Typography>
            </Box>
            <Box>
              <List>
                {listBenefits.map((benefit) => (
                  <ListItem key={benefit} sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                      <CheckOutlinedIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        component="aside"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          width: isMobile ? "100%" : "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
