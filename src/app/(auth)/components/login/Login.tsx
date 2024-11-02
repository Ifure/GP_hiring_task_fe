"use client";

import { loginUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";
import Button from "@/components/button/Button";
import CustomInput from "@/components/input/CustomInput";
import Image from "next/image";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { login } = useAuth();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const loginData = await loginUser({
      email: data.email,
      password: data.password,
    });
    login(loginData);
  };

  return (
    <section className="h-screen  w-full max-w-screen-xl mx-auto  flex justify-center md:justify-between items-center  px-5  md:px-10 ">
      <div className="hidden md:block">
        <Image src="/img/login.png" alt={""} width={700} height={700} />
      </div>
      <div className=" w-full md:w-2/5 p-8 md:py-16 md:px-10  rounded-xl bg-white space-y-20">
        <div className="">
          <h4 className="text-blue-main font-bold text-[28px]">Log In</h4>
          <p className="text-blue-main">Sign in to enjoy our cool features</p>
        </div>
        <div className="space-y-10">
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
            }}
          />
        </div>
        <Button title="Submit" onClick={handleSubmit(onSubmit)} />
      </div>
    </section>
  );
};

export default LoginForm;
