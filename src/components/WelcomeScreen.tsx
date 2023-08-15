"use client";
import React, { useEffect } from "react";
import chatImg from "assets/images/chat_logo.png";
import styles from "../app/page.module.css";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/utils/userStorage";

const WelcomeScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/SignIn", { scroll: false });
    }
  }, []);
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
