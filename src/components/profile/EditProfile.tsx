import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getStorageData } from "@/services/userStorage";
import { updateUser } from "@/services/api";
import { SetUserInformation } from "@/redux/reducers/auth";
import { ToggleActiveEditProfile } from "@/redux/reducers/setting";
import useToast from "@/hooks/useToast";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  about: Yup.string(),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const { createToast, openToast, toastElement } = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      about: user.about || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { jwt } = getStorageData();
        console.log(values);
        const res = await updateUser(jwt, values);
        if (res.status === 202) {
          dispatch(SetUserInformation(res.data));
          dispatch(ToggleActiveEditProfile(false));
          createToast("success", "Profile updated successfully.");
          openToast();
        }
        console.log("updatedData>>", res);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Grid item xs={12} md={8}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            margin="normal"
            size="small"
            {...formik.getFieldProps("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? String(formik.errors.firstName) // Ensure it's a string
                : ""
            }
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            size="small"
            {...formik.getFieldProps("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? String(formik.errors.lastName) // Ensure it's a string
                : ""
            }
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            size="small"
            multiline={true}
            {...formik.getFieldProps("about")}
            error={formik.touched.about && Boolean(formik.errors.about)}
            helperText={
              formik.touched.about && formik.errors.about
                ? String(formik.errors.about) // Ensure it's a string
                : ""
            }
          />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Update Profile
          </Button>
        </form>
        {toastElement}
      </Grid>
    </>
  );
};

export default EditProfile;
