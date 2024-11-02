/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "../index";
import { toast } from "react-toastify";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  password: string;
  username: string;
}

export const loginUser = async (data: ILogin): Promise<Response | null> => {
  try {
    const response = await api.post("auth/login", data);
    const token = response.data.token.split("Bearer ")[1];
    return token;
  } catch (error: any) {
    if (error.status === 404) {
      toast.error("User not found!");
    } else {
      toast.error("Invalid Credentials");
    }
    return null;
  }
};

export const registerUser = async (
  data: IRegister
): Promise<Response | null> => {
  try {
    return await api.post("auth/register", data);
  } catch (error) {
    toast.error("Something went wrong");
    return null;
  }
};
