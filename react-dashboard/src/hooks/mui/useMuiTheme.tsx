import { useTheme } from "@mui/material/styles";

export const useMuiTheme = () => {
  const theme = useTheme();
  const isMdDown = theme.breakpoints.down("md");
  return {
    mode: theme.palette.mode,
    paperColor: theme.palette.background.paper,
    bgDefaultColor: theme.palette.background.default,
    primarColor: theme.palette.color?.primary || "#fff",
    isMdDown,
  };
};
