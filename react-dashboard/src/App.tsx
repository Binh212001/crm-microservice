import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ThemeModeProvider } from "./theme/theme-context";
import { CssBaseline } from "@mui/material";
import "@fontsource/public-sans/400.css"; // Normal
import "@fontsource/public-sans/700.css"; // Bold

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeModeProvider>
  );
}

export default App;
