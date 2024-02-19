import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { ThemeTypeE, useThemeStore } from "../../../../../store/theme.store";

const ThemeToggles = () => {
  const { themeType, setTheme } = useThemeStore();
  const handleToggleTheme = (nextTheme: ThemeTypeE) => {
    setTheme(nextTheme);
  };

  return (
    <Box className="flex">
      <Button
        sx={{ borderRadius: "22px 0px 0px 22px" }}
        fullWidth
        onClick={() => handleToggleTheme(ThemeTypeE.DARK)}
        variant={themeType === ThemeTypeE.DARK ? "contained" : "outlined"}
        startIcon={<DarkMode />}
      >
        Dark
      </Button>
      <Button
        sx={{ borderRadius: "0px 22px 22px 0px" }}
        fullWidth
        onClick={() => handleToggleTheme(ThemeTypeE.LIGHT)}
        variant={themeType === ThemeTypeE.LIGHT ? "contained" : "outlined"}
        startIcon={<LightMode />}
      >
        Light
      </Button>
    </Box>
  );
};

export default ThemeToggles;
