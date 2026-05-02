export const ACCENT_DIM_OPACITY = {
  dark: 0.1,
  light: 0.08,
} as const;

export const ACCENT_PRESETS = [
  { name: "sage", dark: "#52A878", light: "#2A7A50" },
  { name: "amber", dark: "#E8622A", light: "#CC4A18" },
  { name: "sky", dark: "#5B9CF6", light: "#3A6EC8" },
  { name: "violet", dark: "#9B6DF5", light: "#6B3EC8" },
  { name: "rose", dark: "#E05577", light: "#C03055" },
] as const;
