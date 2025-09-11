import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useMuiTheme } from "../../hooks/mui/useMuiTheme";

interface StyleBoxProps {
  children: ReactNode; // children có thể là bất kỳ ReactNode nào (bao gồm string, JSX element,...)
}

export function StyleBox({ children }: StyleBoxProps) {
  const { paperColor } = useMuiTheme();
  return (
    <Box
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        p: 3,
        mb: 3,
        backgroundColor: paperColor,
      }}
    >
      {children}
    </Box>
  );
}
