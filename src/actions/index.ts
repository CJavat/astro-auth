import { loginUser, loginWithGoogle, logOut, registerUser } from "./auth";

export const server = {
  //* actions

  // Auth
  registerUser,
  loginUser,
  logOut,
  loginWithGoogle,
};
