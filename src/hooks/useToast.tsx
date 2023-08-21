"use client";
import Toast from "@/components/Toast";
import React, { useState } from "react";

function useToast() {
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

  const openToast = () => {
    setToastOpen(true);
  };
  const createToast = (type: string, text: string) => {
    setAlert({ type: type, text: text });
  };

  const toastElement = (
    <Toast
      open={toastOpen}
      onClose={handleToastClose}
      message={alert.text}
      severity={alert.type}
    />
  );

  return { openToast, createToast, toastElement };
}

export default useToast;
