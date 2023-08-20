import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SettingInterface {
  isEditProfile: Boolean;
}

const initialState: SettingInterface = {
  isEditProfile: false,
};

export const settingReducer = createSlice({
  name: "SETTING_REDUCER",
  initialState,
  reducers: {
    ToggleActiveEditProfile: (state, action: PayloadAction<any>) => {
      state.isEditProfile = action.payload;
    },
  },
});

export const { ToggleActiveEditProfile } = settingReducer.actions;

export default settingReducer.reducer;
