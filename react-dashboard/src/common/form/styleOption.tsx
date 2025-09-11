import { MenuItem } from "@mui/material";

type OptionProps = {
  value: any;
  children: string;
};

export const StyledOption = ({ value, children }: OptionProps) => {
  return <MenuItem value={value}>{children}</MenuItem>;
};
