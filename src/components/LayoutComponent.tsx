"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStorageData, setStorageData } from "@/services/userStorage";
import { getUser, validateRefreshToken } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { SetUserInformation, UpdateLoginStatus } from "@/redux/reducers/auth";

const LayoutComponent = ({ children }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const data = getStorageData();
    if (!data?.jwt) {
      router.push("/signin", { scroll: false });
    } else {
      getUserInfo(data.jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserInfo(jwt: string) {
    try {
      const { data: userData } = await getUser(jwt);
      dispatch(UpdateLoginStatus(true));
      dispatch(SetUserInformation(userData));
      console.log(userData);
    } catch (error: any) {
      console.log(error);

      if (
        error.response.status === 401 &&
        error.response.data.message === "Invalid token."
      ) {
        // Access token has expired, attempt to refresh it
        try {
          const { refreshToken } = getStorageData();
          const refreshResponse = await validateRefreshToken(refreshToken);
          const newToken = refreshResponse.data;
          console.log("newToken>>>", newToken);
          setStorageData(newToken);
          const { data: userData } = await getUser(newToken.jwt);
          dispatch(UpdateLoginStatus(true));
          dispatch(SetUserInformation(userData));
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError.message);
          router.push("/signin", { scroll: false });
        }
      } else {
        console.error("Protected request failed:", error.message);
        router.push("/signin", { scroll: false });
      }
    }
  }

  return <>{children}</>;
};

export default LayoutComponent;
