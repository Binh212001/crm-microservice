import { Box, Stack, TextField } from "@mui/material";
import ThemeToggleButton from "../../theme/theme-toggle-button";
import "./header.css";
import UserDropdown from "./userDropdown/UserDropdown";
import { useMuiTheme } from "../../hooks/mui/useMuiTheme";

export function Header() {
  const { paperColor } = useMuiTheme();
  return (
    <Box
      id="header"
      sx={{
        boxShadow: 2,
        p: 1,
        borderRadius: 2,
        mt: 2,
        backgroundColor: paperColor,
      }}
    >
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        useFlexGap
      >
        {/* //Search */}
        <Box>
          <TextField placeholder="Search" color="tertiary" />
        </Box>
        <Stack direction="row">
          <ThemeToggleButton />
          <UserDropdown />
        </Stack>
      </Stack>
    </Box>
  );
}
