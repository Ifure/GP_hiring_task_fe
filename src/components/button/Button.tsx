import React, { useState } from "react";

const Button = ({
  title,
  onClick,
  borderBtn,
  icon,
  size,
  disabled,
  bgColor,
  textColor,
}: {
  title: string;
  onClick?: () => void;
  borderBtn?: boolean;
  icon?: string;
  size?: string;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClass = borderBtn
    ? "bg-transparent border border-white text-gray-100"
    : isClicked
    ? "bg-yellow-200 text-white"
    : "bg-yellow-300 text-gray-900";

  const width =
    size === "sm"
      ? "w-10 py-5"
      : "px-5 md:px-10 py-5 shadow-md shadow-[#54626F] bg-[#012169]";

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`text-nowrap w-full rounded-[10px] flex items-center justify-center gap-2 text-[12px] md:text-[16px] ${buttonClass} ${width} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={!disabled ? handleClick : undefined}
      disabled={disabled}
    >
      {icon && <img src={icon} alt="" />}
      <p>{title}</p>
    </button>
  );
};

export default Button;
