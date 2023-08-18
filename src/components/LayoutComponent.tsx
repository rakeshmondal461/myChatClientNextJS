"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/utils/userStorage";
import { getUser } from "@/services/api";
import { useDispatch } from "react-redux";
import { setUserInformation, updateLoginStatus } from "@/redux/reducers/auth";

const LayoutComponent = ({ children }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const data = getUserData();
    if (!data?.jwt) {
      router.push("/signin", { scroll: false });
    } else {
      getUserInfo(data.jwt);
    }
  }, []);

  async function getUserInfo(jwt: string) {
    try {
      const { data: userData } = await getUser(jwt);
      dispatch(updateLoginStatus(true));
      dispatch(setUserInformation(userData));
      console.log(userData);
    } catch (error) {
      console.log(error);
      router.push("/signin", { scroll: false });
    }
  }
  return <>{children}</>;
};

export default LayoutComponent;
