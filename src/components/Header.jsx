import { NavLink } from "react-router-dom";

import { useUserActions } from "../store/user-store";
import { useUser } from "../store/user-store";
const Header = () => {
  const { logOut } = useUserActions();
  const user = useUser();
  console.log(user);

  return (
    <header className="h-16 bg-blue-400  text-white font-bold text-xl ">
      <div className="h-full w-full flex items-center justify-between px-10">
        <div className="text-white">Ivory Payment</div>
        <div className="space-x-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500 underline" : ""
            }
          >
            Home
          </NavLink>
          {user?.roles.includes("admin") ? (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-red-500 underline" : ""
              }
            >
              Manage Users
            </NavLink>
          ) : null}
          {user?.roles.includes("admin") || user?.roles.includes("user") ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-red-500 underline" : ""
                }
              >
                Dashboard
              </NavLink>

              <button onClick={() => logOut()}>sign out</button>
            </>
          ) : null}
          {!user ? <NavLink to="/login">sign in</NavLink> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
