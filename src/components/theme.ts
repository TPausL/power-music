import { createTheme } from "@mui/material";
import "typeface-dm-sans";

export const theme = createTheme({
  gradients: {
    primary: "linear-gradient(89deg, #ffdc12, #76de57)",
  },
  palette: {
    primary: { main: "#ffdc12" },
  },
  typography: { fontFamily: ["DM Sans"].join(",") },
});

declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      primary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    gradients?: {
      primary?: string;
    };
  }
}
