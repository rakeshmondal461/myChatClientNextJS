export const getAuthToken = () => {
  return localStorage.getItem("JWT");
};

export const setAuthToken = (token: string) => {
  //const tokenString = JSON.stringify(token);
  localStorage.setItem("JWT", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token: string) => {
  //const tokenString = JSON.stringify(token);
  localStorage.setItem("refreshToken", token);
};

export const clearAuthToken = () => {
  localStorage.clear();
};
