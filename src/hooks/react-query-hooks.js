import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => {
      return axiosInstance
        .post("http://localhost:3005/auth/login", credentials)
        .then((res) => res.data);
    },
    onSuccess: () => toast.success("Login Successful"),
    onError: (err) => toast.error(err.response.data.message),
  });
};

const transactions = [];

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const useTransaction = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => delay(2000).then(() => transactions),
  });
};
