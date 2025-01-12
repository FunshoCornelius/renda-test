/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(auth)/signin/page.tsx
"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import { useCreateUserMutation } from "@/api/slices/authSlice";
import { CreateUserType } from "@/types/authUserType";
import { useRouter } from "next/navigation";
import { sendToastNotification } from "@/utils/utils";

const initialState: CreateUserType = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
};
export default function SignIn() {
  const [formData, setFormData] = useState<CreateUserType>(initialState);

  const [errors, setErrors] = useState<CreateUserType>(initialState);
  const router = useRouter();

  const [
    createUser,
    { isLoading: creatingUser, error: createUserError, isSuccess: userCreated },
  ]: any = useCreateUserMutation();

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
    if (formData.first_name === "") {
      setErrors((prev) => ({ ...prev, first_name: "First name is required" }));
      return;
    }
    if (formData.last_name === "") {
      setErrors((prev) => ({ ...prev, last_name: "Last name is required" }));
      return;
    }
    if (formData.phone_number === "") {
      setErrors((prev) => ({
        ...prev,
        phone_number: "Phone number is required",
      }));
      return;
    }

    try {
      await createUser(formData).unwrap();
      sendToastNotification(
        "User created successfully, Proceed to login",
        "success"
      );
      if (userCreated) router.push("/login");
    } catch (error: unknown) {
      console.log(error);
      sendToastNotification(
        createUserError?.data?.message || "Something went wrong",
        "error"
      );
    }

    setFormData(initialState);
    setErrors(initialState);
  };

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
          Create Account
        </Typography>
        <Typography variant="body1" fontSize={16}>
          Enter your information to create an account
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <TextField
              id="firstName"
              type="text"
              onBlur={() => setErrors({ ...errors, first_name: "" })}
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              placeholder="Max"
              variant="outlined"
              fullWidth
            />
            {errors.first_name && (
              <Typography variant="body2" color="error">
                {errors.first_name}
              </Typography>
            )}
          </Box>
          <Box>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <TextField
              id="lastName"
              type="text"
              onBlur={() => setErrors({ ...errors, last_name: "" })}
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              variant="outlined"
              fullWidth
            />
            {errors.last_name && (
              <Typography variant="body2" color="error">
                {errors.last_name}
              </Typography>
            )}
          </Box>
        </Box>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          type="email"
          onBlur={() => setErrors({ ...errors, email: "" })}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          variant="outlined"
          fullWidth
        />
        {errors.email && (
          <Typography variant="body2" color="error">
            {errors.email}
          </Typography>
        )}
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <TextField
          id="phoneNumber"
          type="number"
          onBlur={() => setErrors({ ...errors, phone_number: "" })}
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          variant="outlined"
          fullWidth
        />
        {errors.phone_number && (
          <Typography variant="body2" color="error">
            {errors.phone_number}
          </Typography>
        )}
        <FormLabel htmlFor="phoneNumber">Password</FormLabel>
        <TextField
          id="password"
          type="password"
          onBlur={() => setErrors({ ...errors, password: "" })}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          variant="outlined"
          fullWidth
        />
        {errors.password && (
          <Typography variant="body2" color="error">
            {errors.password}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
            bgcolor: "#0F172A",
            textTransform: "none",
            fontWeight: "500",
          }}
          fullWidth
          disabled={creatingUser}
        >
          {creatingUser ? "Please wait..." : "Create an account"}
        </Button>
      </Box>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          style={{ color: "#0F172A", textDecoration: "underline" }}
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
}
