"use client";
import ResponsiveAppBar from "@/components/AppBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import mainStyles from "./page.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Toast from "@/components/Toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SignInFormValues } from "@/utils/constants";
import { userSignIn } from "@/services/api";
import { setAuthToken, setRefreshToken } from "@/utils/userStorage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: any; text: string }>({
    type: "",
    text: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitSignInForm,
  });

  async function submitSignInForm(values: SignInFormValues) {
    try {
      const response: any = await userSignIn(values);
      console.log(response);
      if (!response) {
        setAlert({ type: "error", text: "Something went wrong" });
        setToastOpen(true);
      }
      setAuthToken(response.data.jwt);
      setRefreshToken(response.data.refreshToken);
      setAlert({
        type: "success",
        text: "Sign In Successfully!",
      });
      setToastOpen(true);
      router.push("/", { scroll: false });
    } catch (error: any) {
      console.log(error.response.statusText);
      setAlert({ type: "error", text: error.response.statusText });
      setToastOpen(true);
    }
  }

  const handleToastClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };
  return (
    <>
      <ResponsiveAppBar />
      <div className={mainStyles.mainContainer}>
        <div className={mainStyles.formWrapper}>
          <h4>Sign In</h4>
          <form onSubmit={formik.handleSubmit}>
            <FormControl className={mainStyles.formControl}>
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                size="small"
                className={mainStyles.signUpField}
                {...formik.getFieldProps("email")}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? "text" : "password"}
                className={mainStyles.signUpField}
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className={mainStyles.signupLinkWrapper}>
                <Link
                  href="#"
                  underline="hover"
                  className={mainStyles.linkText}
                  onClick={() => router.push("/Signup")}
                >
                  Create New Account
                </Link>
              </div>

              <Button
                variant="contained"
                size="medium"
                className={mainStyles.signUpSubmitButton}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        message={alert.text}
        severity={alert.type}
      />
    </>
  );
};

export default SignIn;
