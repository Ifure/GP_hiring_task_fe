import React from "react";
import { Control, Controller } from "react-hook-form";

interface CustomInputProps {
  control?: Control<any>;
  name: string;
  placeholder?: string;
  rules?: any;
  password?: boolean;
  bg?: string;
}

export default function CustomInput({
  control,
  name,
  placeholder,
  rules,
  password,
  bg,
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div>
          <input
            onChange={onChange}
            onBlur={onBlur}
            style={{ backgroundColor: bg }}
            value={value ?? ""}
            placeholder={placeholder}
            type={password ? "password" : "text"}
            className={`border-[0.5px] border-gray-300 w-full rounded-xl  py-5  px-4 md:px-5 text-gray-900 ${
              error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      )}
    />
  );
}
