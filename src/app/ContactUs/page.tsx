"use client";
import React, { useEffect } from "react";
import { initSocket, sendMessage } from "../../utils/socket";
import Button from "@mui/material/Button";
import uuid4 from "uuid4";

const Contact = () => {
  useEffect(() => {
    let id = uuid4();
    initSocket(id);
  }, []);

  const sendMessageToServer = () => {
    sendMessage("Hi", "User1012");
  };

  return (
    <div>
      <Button variant="contained" onClick={sendMessageToServer}>
        Send Message
      </Button>
    </div>
  );
};

export default Contact;
