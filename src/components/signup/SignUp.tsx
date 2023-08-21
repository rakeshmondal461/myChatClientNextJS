import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import mainStyles from "./signup.module.css";
import Toast from "../Toast";
import { getStorageData, setStorageData } from "@/services/userStorage";
import { SignUpFormValues } from "@/utils/constants";
import { userSignUp } from "@/services/api";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (#, @$!%*?&)"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: any; text: string }>({
    type: "",
    text: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleToastClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      setAlert({ type: "warning", text: "Already logged in!" });
      setTimeout(() => {
        router.push("/", { scroll: false });
      }, 500);
    }
  }, [auth]);

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitSignUpForm,
  });

  async function submitSignUpForm(values: SignUpFormValues) {
    try {
      const response: any = await userSignUp(values);
      if (!response) {
        setAlert({ type: "error", text: "Something went wrong" });
        setToastOpen(true);
      }
      setStorageData(response.data);
      setAlert({
        type: "success",
        text: "Congratulations! Sign Up Successfull!",
      });
      setToastOpen(true);
      router.push("/", { scroll: false });
    } catch (error: any) {
      console.log(error.response.statusText);
      setAlert({ type: "error", text: error.response.statusText });
      setToastOpen(true);
    }
  }
  return (
    <>
      <div className={mainStyles.mainContainer}>
        <div className={mainStyles.formWrapper}>
          <h4>Sign Up</h4>
          <form onSubmit={formik.handleSubmit}>
            <FormControl className={mainStyles.formControl}>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                size="small"
                className={mainStyles.signUpField}
                {...formik.getFieldProps("firstName")}
                error={
                  formik.touched.firstName && formik.errors.firstName
                    ? true
                    : false
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                size="small"
                className={mainStyles.signUpField}
                {...formik.getFieldProps("lastName")}
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? true
                    : false
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
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

              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                className={mainStyles.signUpField}
                {...formik.getFieldProps("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        size="small"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                  onClick={() => router.push("/signin")}
                >
                  Already have account?
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

export default SignUp;
