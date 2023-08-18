export const getUserData = () => {
  return JSON.parse(localStorage.getItem("authData")!);
};

export const setUserData = (data: any) => {
  localStorage.setItem("authData", JSON.stringify(data));
};

export const clearAuthToken = () => {
  localStorage.clear();
};
