export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem("loggedIn", JSON.stringify(true));
  localStorage.setItem("user", JSON.stringify(userData));
};
