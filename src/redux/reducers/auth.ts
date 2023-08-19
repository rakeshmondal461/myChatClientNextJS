import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthInterface {
  isLoggedIn: Boolean;
  user: {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const initialState: AuthInterface = {
  isLoggedIn: false,
  user: {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
  },
};

export const authReducer = createSlice({
  name: "AUTH_REDUCER",
  initialState,
  reducers: {
    UpdateLoginStatus: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action.payload;
    },
    SetUserInformation: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { UpdateLoginStatus, SetUserInformation } = authReducer.actions;

export default authReducer.reducer;
