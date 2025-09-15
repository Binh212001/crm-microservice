import { RouterProvider } from 'react-router-dom';
import { ThemeModeProvider } from './theme/theme-context';
import { AuthProvider } from './contexts/AuthContext';
import { CssBaseline } from '@mui/material';
import '@fontsource/public-sans/400.css'; // Normal
import '@fontsource/public-sans/700.css'; // Bold
import { router } from './routes/routes';
function App() {
  return (
    <AuthProvider>
      <ThemeModeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeModeProvider>
    </AuthProvider>
  );
}

export default App;
