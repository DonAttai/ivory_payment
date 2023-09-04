import { toast } from "react-hot-toast";
import { useLogin } from "../hooks/react-query-hooks";
import { useEffect, useRef } from "react";
import { useUser, useUserActions } from "../store/user-store";
import { useNavigate } from "react-router-dom";

const credentials = {
  id: 1,
  email: "attai@gmail.com",
  roles: ["admin"],
  transactions: [
    {
      createdAt: "2023-08-27T21:26:05.579Z",
      amount: "094707791",
      user: "baeda5b1de95fb87cbee712e",
      id: "1",
    },
    {
      createdAt: "2023-08-27T13:24:00.665Z",
      amount: "387847766",
      user: "baeda5b1de95fb87cbee712e",
      id: "2",
    },
    {
      createdAt: "2023-08-27T12:50:40.470Z",
      amount: "745874504",
      user: "baeda5b1de95fb87cbee712e",
      id: "3",
    },
  ],
};

export const Login = () => {
  const { data, isLoading, mutate } = useLogin();
  const { setCredentials } = useUserActions();
  const navigate = useNavigate();
  const user = useUser();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    if (data) {
      setCredentials(credentials);
    }
  }, [setCredentials, data]);

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
