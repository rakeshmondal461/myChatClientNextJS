"use client";
import React from "react";
import chatImg from "assets/images/chat_logo.png";
import Image from "next/image";
import styles from "../app/page.module.css";

const WelcomeScreen = () => {
  return (
    <div className={styles.heroContainer}>
      <img
        src="/assets/images/chat_logo.png" // Route of the image file
        height={"auto"} // Desired size with correct aspect ratio
        width={"auto"} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </div>
  );
};

export default WelcomeScreen;
