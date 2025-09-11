import { alpha, createTheme } from "@mui/material/styles";
import "@fontsource/poppins/400.css"; // Normal
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/400-italic.css"; // Italic

const WHITE_COLOR = "#fff";

const LIGHT_TXT_PRIMARY = "#444050";
const LIGHT_DEFALUT_BG = "#f5f5f5";
const LIGHT_PAPER_BG = "#fff";
const LIGHT_PRIMARY_COLOR = "#EB3D63";
export const lightTheme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: "light",
    background: {
      default: LIGHT_DEFALUT_BG,
      paper: LIGHT_PAPER_BG,
    },
    text: {
      primary: LIGHT_TXT_PRIMARY,
    },
    color: {
      primary: LIGHT_PRIMARY_COLOR,
    },
    tertiary: {
      main: LIGHT_PRIMARY_COLOR,
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "8px 16px", // top-bottom | left-right
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: LIGHT_PRIMARY_COLOR,
            color: WHITE_COLOR,
            border: "1px solidrgb(235, 253, 186)",
            "&:hover": {
              backgroundColor: alpha(LIGHT_PRIMARY_COLOR, 0.9),
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      ],
    },
  },
});

const DARK_TXT_PRIMARY = "#cfcde4";
const DARK_DEFALUT_BG = "#25293C";
const DARK_PAPER_BG = "#25293C";
const DARK_PRIMARY_COLOR = "#8A80F3";

export const darkTheme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: "dark",
    text: {
      primary: DARK_TXT_PRIMARY,
    },
    background: {
      default: DARK_DEFALUT_BG,
      paper: DARK_PAPER_BG,
    },
    color: {
      primary: DARK_PRIMARY_COLOR,
    },
    tertiary: {
      main: DARK_PRIMARY_COLOR,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "8px 16px", // top-bottom | left-right
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: DARK_PRIMARY_COLOR,
            border: "1px solid #333",
            color: WHITE_COLOR,
            "&:hover": {
              backgroundColor: alpha(DARK_PRIMARY_COLOR, 0.9),
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      ],
    },
  },
});
