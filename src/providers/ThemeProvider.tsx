import { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as ColorThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "../store/theme.store";

const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const mode = useThemeStore((s) => s.themeType);

  const theme = useMemo(
    () =>
      createTheme({
        // To Customize Color Palette >> https://mui.com/material-ui/customization/palette
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ColorThemeProvider>
  );
};

export default ThemeProvider;
