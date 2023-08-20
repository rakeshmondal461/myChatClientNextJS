"use client";
import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
const ViewProfile: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
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
              // Handle edit profile click
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
