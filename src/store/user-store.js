import { create } from "zustand";
import { devtools } from "zustand/middleware";

const user = JSON.parse(localStorage.getItem("userInfo"));
const userStore = create(
  devtools((set) => ({
    user: user ? user : null,

    actions: {
      setCredentials: (credentials) => {
        localStorage.setItem("userInfo", JSON.stringify(credentials));
        return set({ user: credentials });
      },
      logOut: () => {
        localStorage.removeItem("userInfo");
        return set({ user: null });
      },
    },
  }))
);

export const useUser = () => userStore((state) => state.user);

export const useUserActions = () => userStore((state) => state.actions);
