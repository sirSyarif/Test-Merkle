import { alpha } from "@mui/material/styles";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS GRAY INTENSITY
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

// SETUP COLOR PALLETE

const MAIN = {
  main: "#27B973",
};

const PRIMARY = {
  superlight: "#EEFFF7",
  lighter: "#B7FFDC",
  light: "#54E6A0",
  main: "#27B973",
  dark: "#0A7542",
  darker: "#08532F",
  contrastText: "#fff",
};
const SECONDARY = {
  superlight: "#E6F4FF",
  lighter: "#9AD3FF",
  light: "#4FB3FF",
  main: "#038EF7",
  dark: "#0066B3",
  darker: "#003F6F",
  contrastText: "#fff",
};
const INFO = {
  lighter: "#9AD3FF",
  light: "#4FB3FF",
  main: "#038EF7",
  dark: "#0066B3",
  darker: "#003F6F",
  contrastText: "#fff",
};
const SUCCESS = {
  lighter: "#E2FAD5",
  light: "#90E27D",
  main: "#2BA029",
  dark: "#147323",
  darker: "#074C1E",
  contrastText: "#fff",
};
const WARNING = {
  superlight: "#FFFAED",
  lighter: "#FFE39B",
  light: "#F5C547",
  main: "#F5C547",
  dark: "#8F6D15",
  darker: "#5C4407",
  contrastText: "#fff",
};
const ERROR = {
  superlight: "#FFEDEF",
  lighter: "#FF9EA9",
  light: "#FF4F63",
  main: "#D53043",
  dark: "#A21727",
  darker: "#6F0612",
  contrastText: "#fff",
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette = {
  common: { black: "#000", white: "#fff", main: "#AA3E89" },
  main: { ...MAIN },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
