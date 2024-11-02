"use client";

import { registerUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";
import Button from "@/components/button/Button";
import CustomInput from "@/components/input/CustomInput";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SignUp() {
  const { register } = useAuth();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: any) => {
    const registerInput = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const response = await registerUser(registerInput);
    if (response) register();
    else toast.error("Something went wrong!");
  };

  return (
    <section className="h-screen  w-full max-w-screen-xl mx-auto  flex justify-center md:justify-between items-center  px-5  md:px-10  ">
      <div className="hidden md:block">
        <Image src="/img/register.png" alt={""} width={800} height={800} />
      </div>
      <div className=" w-full md:w-2/5 p-8 md:px-10 py-10  rounded-xl bg-blue-main space-y-10">
        <div className="">
          <h4 className="text-[#eceff3] font-bold text-[28px]">Sign Up</h4>
          <p className="">Sign Up to enjoy our cool features</p>
        </div>
        <form className="space-y-5  ">
          <CustomInput
            placeholder="Username"
            control={control}
            name="username"
            rules={{
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username can only contain letters and numbers",
              },
            }}
          />
          <CustomInput
            placeholder="Email"
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
          />
          <CustomInput
            placeholder="Password"
            control={control}
            name="password"
            password
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />
        </form>
        <Button title="Submit" onClick={handleSubmit(onSubmit)} />
      </div>
    </section>
  );
}

export default SignUp;
