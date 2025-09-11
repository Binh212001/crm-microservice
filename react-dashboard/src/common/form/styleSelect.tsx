import {
  Select,
  SelectProps,
  Stack,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  label?: string;
  value?: SelectProps["value"]; // ✅ Thêm value
  defaultValue?: SelectProps["value"]; // ✅ Hoặc defaultValue
  onChange?: any; // ✅ Cho phép truyền onChange
  variant?: SelectProps["variant"];
  color?: SelectProps["color"];
}

export const StyledSelect = ({
  children,
  label,
  value,
  defaultValue,
  onChange,
  variant = "outlined",
  color = "tertiary",
}: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {label && <label>{label}</label>}
      <Select
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        variant={variant}
        color={color}
        fullWidth
      >
        {children}
      </Select>
    </Stack>
  );
};
