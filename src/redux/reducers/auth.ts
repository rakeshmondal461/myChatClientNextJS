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
  name: "auth",
  initialState,
  reducers: {
    updateLoginStatus: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action.payload;
    },
    setUserInformation: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLoginStatus, setUserInformation } = authReducer.actions;

export default authReducer.reducer;
