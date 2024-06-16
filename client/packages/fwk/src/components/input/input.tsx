import React, { useCallback } from "react";
import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/react";

interface Props {
  id: string;
  label: string;
  value?: any;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "underline" | "filled";
  onChange?(value: any): void;
}

const VARIANT_TO_NEXT_INPUT_VARIANT = {
  outlined: "bordered",
  underline: "underlined",
  filled: "flat",
};

const Input: React.FC<Props> = (props: Props) => {
  const { variant = "outlined", size = "md" } = props;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange],
  );

  return (
    <NextInput
      id={props.id}
      label={props.label}
      size={size}
      labelPlacement="outside"
      variant={
        VARIANT_TO_NEXT_INPUT_VARIANT[variant] as NextInputProps["variant"]
      }
      onChange={props.onChange ? onChange : undefined}
    />
  );
};

export default Input;
