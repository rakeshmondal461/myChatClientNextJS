export const getStorageData = () => {
  return JSON.parse(localStorage.getItem("authData")!);
};

export const setStorageData = (data: any) => {
  localStorage.setItem("authData", JSON.stringify(data));
};

export const clearAuthToken = () => {
  localStorage.clear();
};
