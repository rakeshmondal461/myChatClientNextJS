/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./home.module.css";
import ResponsiveAppBar from "../header/AppBar";
const WelcomeScreen = () => {
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
