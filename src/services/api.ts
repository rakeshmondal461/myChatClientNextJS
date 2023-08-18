import axios from "axios";
import { SignUpFormValues, SignInFormValues } from "@/utils/constants";

export const userSignUp = async (values: SignUpFormValues) => {
  const res = await axios.post("http://localhost:4001/user/signup", values);
  return res;
};

export const userSignIn = async (values: SignInFormValues) => {
  const res = await axios.post("http://localhost:4001/user/signin", values);
  return res;
};

export const getUser = async (token: string) => {
  const res = await axios.get("http://localhost:4001/user/getUser", {
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  });
  return res;
};
