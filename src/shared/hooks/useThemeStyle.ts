/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeTypeE, useThemeStore } from "../../store/theme.store";

export function useThemeStyle(lightStyle: any, darkStyle: any) {
  const theme = useThemeStore((s) => s.themeType);
  return theme === ThemeTypeE.LIGHT ? lightStyle : darkStyle;
}
