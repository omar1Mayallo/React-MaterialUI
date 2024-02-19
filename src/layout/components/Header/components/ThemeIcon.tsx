import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { ThemeTypeE, useThemeStore } from "../../../../store/theme.store";
import { Tooltip } from "@mui/material";

export default function ThemeIcon() {
  const { toggleTheme, themeType } = useThemeStore();

  return (
    <Tooltip
      title={
        themeType === ThemeTypeE.DARK
          ? "Switch to Light Mode"
          : "Switch to Dark Mode"
      }
    >
      <IconButton onClick={toggleTheme} color="inherit">
        {themeType === ThemeTypeE.DARK ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}
