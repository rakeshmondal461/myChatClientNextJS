"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "./home.module.css";
import ResponsiveAppBar from "../header/AppBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const WelcomeScreen = () => {
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push("/signin", { scroll: false });
    }
  }, [auth.isLoggedIn]);
  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <img
            src="/assets/images/chat_logo.png"
            height={"auto"}
            width={"auto"}
            alt="Your Name"
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
