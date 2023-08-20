"use client";
import React, { useState, useRef } from "react";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./profile.module.css";
import ViewProfile from "./ViewProfile";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadProfileImage } from "@/services/api";
import { getStorageData } from "@/utils/userStorage";
import Toast from "../Toast";
import { SetUserInformation, UpdateLoginStatus } from "@/redux/reducers/auth";
import { useRouter } from "next/navigation";
const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileBlob, setProfileBlob] = useState<string | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: any; text: string }>({
    type: "",
    text: "",
  });

  const handleToastClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const handleEditAvatarClick = () => {
    console.log(fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click event on file input
    }
  };

  const handleCancelAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input by setting its value to an empty string
    }
    setSelectedFile(null);
    setProfileBlob(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      console.log("Selected File:", selectedFile.name);
      setSelectedFile(selectedFile);
      // Create a blob URL from the selected file and set it as the Avatar's URL
      const blobUrl = URL.createObjectURL(selectedFile);
      setProfileBlob(blobUrl);
    }
  };

  const handleProfileImageUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileName", user.uid);
      const { jwt } = getStorageData();
      try {
        const response: any = await uploadProfileImage(formData, jwt);
        if (response.status === 202) {
          setAlert({ type: "success", text: "Image uploaded successfully." });
          setToastOpen(true);
          const { data: userData } = await getUser(jwt);
          dispatch(UpdateLoginStatus(true));
          dispatch(SetUserInformation(userData));
          handleCancelAvatarClick();
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          router.push("/", { scroll: false });
        }
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginBlock: "20px" }}>
        {user.email ? (
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className={styles.avatarContainer}>
                  {!selectedFile ? (
                    <div
                      className={styles.profileEditIcon}
                      onClick={handleEditAvatarClick}
                    >
                      <EditIcon />
                    </div>
                  ) : (
                    <div
                      className={styles.profileCancelIcon}
                      onClick={handleCancelAvatarClick}
                    >
                      <ClearIcon />
                    </div>
                  )}
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={profileBlob || user?.avatar}
                    sx={{ width: 150, height: 150 }}
                    style={{ fontSize: "48px" }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <>
                    <Typography
                      variant="subtitle1"
                      style={{ paddingTop: "10px", textAlign: "center" }}
                      gutterBottom
                    >
                      {selectedFile.name}
                    </Typography>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleProfileImageUpload}
                    >
                      <CloudUploadIcon
                        style={{
                          color: "green",
                          height: "40px",
                          width: "40px",
                        }}
                      />
                    </div>
                  </>
                )}
              </Grid>
              <ViewProfile />
            </Grid>
          </Paper>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="40vh"
          />
        )}
      </Container>
      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        message={alert.text}
        severity={alert.type}
      />
    </>
  );
};

export default Profile;
