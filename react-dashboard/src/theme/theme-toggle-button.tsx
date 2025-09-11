import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorMode } from "./theme-context";

export default function ThemeToggleButton() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
