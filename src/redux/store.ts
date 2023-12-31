import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import logger from "redux-logger";
import settingReducer from "./reducers/setting";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
