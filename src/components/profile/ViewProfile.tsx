"use client";
import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToggleActiveEditProfile } from "@/redux/reducers/setting";
const ViewProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const enableEditProfile = () => {
    dispatch(ToggleActiveEditProfile(true));
  };
  return (
    <>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body1">
          {user.about || "No description is available."}
        </Typography>
        <div
          style={{
            paddingBlock: "40px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              enableEditProfile();
            }}
          >
            Edit Profile
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default ViewProfile;
