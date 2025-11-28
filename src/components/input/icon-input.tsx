import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export interface IconInputProps extends React.ComponentProps<"input"> {
  iconPosition?: "left" | "right";
  icon: React.ReactNode;
  onIconClick?: () => void;
}

export default function IconInput(props: IconInputProps) {
  const { iconPosition = "right", icon, onIconClick, ...rest } = props;

  return (
    <InputGroup>
      <InputGroupInput placeholder="Input..." {...rest} />
      <InputGroupAddon
        id="icon-button"
        data-testid="icon-button"
        className={onIconClick ? "cursor-pointer" : ""}
        align={iconPosition === "left" ? "inline-start" : "inline-end"}
        onClick={onIconClick}
      >
        {icon}
      </InputGroupAddon>
    </InputGroup>
  );
}
