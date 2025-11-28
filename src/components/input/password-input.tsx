"use client";

import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import IconInput, { IconInputProps } from "./icon-input";

export default function PasswordInput(
  props: Pick<IconInputProps, "iconPosition"> & React.ComponentProps<"input">
) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <IconInput
      type={showPassword ? "text" : "password"}
      icon={
        showPassword ? (
          <EyeIcon className="h-4 w-4" />
        ) : (
          <EyeOffIcon className="h-4 w-4" />
        )
      }
      onIconClick={togglePasswordVisibility}
      {...props}
    />
  );
}
