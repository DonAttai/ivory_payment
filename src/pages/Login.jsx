import { toast } from "react-hot-toast";
import { useLogin } from "../hooks/react-query-hooks";
import { useEffect, useRef } from "react";
import { useUser, useUserActions } from "../store/user-store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { data: credentials, isLoading, mutate } = useLogin();
  const { setCredentials } = useUserActions();
  const navigate = useNavigate();
  const user = useUser();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    if (credentials) {
      setCredentials(credentials);
    }
  }, [setCredentials, credentials]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    if (values.includes("")) {
      toast.error("Password and Username are required!");
      return;
    }
    const userData = Object.fromEntries(formData.entries());
    mutate(userData);
    e.currentTarget.reset();
  };

  return (
    <section className="mt-10">
      <h1 className="text-center font-semibold text-xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-5/6 md:w-1/3 p-5 bg-white text-slate-500 border rounded-md shadow appearance-none"
      >
        <div className="mb-2">
          <label className="font-bold text-sm" htmlFor="email">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="search"
            id="email"
            ref={inputRef}
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </div>
        <div>
          <button
            className="bg-blue-400 w-full py-2 rounded-md text-white font-bold disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Wait..." : "sign in"}
          </button>
        </div>
      </form>
    </section>
  );
};
