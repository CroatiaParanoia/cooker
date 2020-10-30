import React from "react";

export interface ButtonProps {
  type?: "ghost" | "primary";
  size?: "small" | "middle" | "large";
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({ type, size, label }) => {
  return <div>132</div>;
};
