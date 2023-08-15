import Image from "next/image";
import styles from "./page.module.css";
import ResponsiveAppBar from "@/components/AppBar";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <WelcomeScreen />
      </div>
    </>
  );
}
