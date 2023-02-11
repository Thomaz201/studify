import chalk from "chalk";

type colorType = "text" | "variable" | "error" | "success" | "info" | "accent"

const themeColors = {
  text: "#F8F8F2",
  variable: "#9580FF",
  error: "#FF9580",
  success: "#8AFF80",
  info: "#80FFEA",
  accent: "#504C67"
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`);

export const color = (color: colorType, message: any) => {
  return chalk.hex(themeColors[color])(message)
};
