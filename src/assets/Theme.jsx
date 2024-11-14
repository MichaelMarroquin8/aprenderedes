// theme.js
import { createTheme, alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorMode } from "src/store/slices/userSlice";

// Definición de colores personalizados
export const brand = {
  50: "#F0F7FF",
  100: "#CEE5FD",
  200: "#9CCCFC",
  300: "#55A6F6",
  400: "#0A66C2",
  500: "#0959AA",
  600: "#064079",
  700: "#033363",
  800: "#02294F",
  900: "#021F3B",
};

export const secondary = {
  50: "#F9F0FF",
  100: "#E9CEFD",
  200: "#D49CFC",
  300: "#B355F6",
  400: "#750AC2",
  500: "#6709AA",
  600: "#490679",
  700: "#3B0363",
  800: "#2F024F",
  900: "#23023B",
};

export const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};

export const green = {
  50: "#F6FEF6",
  100: "#E3FBE3",
  200: "#C7F7C7",
  300: "#A1E8A1",
  400: "#51BC51",
  500: "#1F7A1F",
  600: "#136C13",
  700: "#0A470A",
  800: "#042F04",
  900: "#021D02",
};

// Otros colores
export const tokens = (mode) => ({
  ...(mode === "light"
    ? {
        // Modo Claro
        OrangeAccent: {
          100: "#FFEDE6",
          200: "#FFDBCB",
          300: "#FFB692",
          400: "#FF8D4F",
          500: "#F06700",
          600: "#C65400",
          700: "#9F4200",
          800: "#793100",
          900: "#552000",
          1000: "#341100",
        },
        BlueAccent: {
          100: "#DAF5FF",
          200: "#B0ECFF",
          300: "#3DD7FC",
          400: "#27bcfd",
          500: "#009EBC",
          600: "#00829B",
          700: "#00677C",
          800: "#004E5E",
          900: "#003641",
          1000: "#001F27",
        },
        YellowAccent: {
          100: "#FFF0C1",
          200: "#FFE168",
          300: "#E6C52A",
          400: "#C8A900",
          500: "#A98F00",
          600: "#8C7600",
          700: "#6F5D00",
          800: "#544600",
          900: "#3A3000",
          1000: "#221B00",
        },
        RedAccent: {
          100: "#FFEDEA",
          200: "#FFDAD6",
          300: "#FFB4AB",
          400: "#FF897D",
          450: "#FF897D",
          500: "#FF5449",
          600: "#DE3730",
          700: "#BA1A1A",
          800: "#93000A",
          900: "#690005",
          1000: "#410002",
        },
        GreenAccent: {
          100: "#ccf6e4",
          200: "#99edca",
          300: "#66e4af",
          400: "#33db95",
          500: "#00d27a",
          600: "#00a862",
          700: "#007e49",
          800: "#005431",
          900: "#002a18",
        },
        primary: {
          0: "#edf2f9",
          10: "rgba(255, 255, 255, 0.03)",
          20: "#F4F3F3",
          50: "#f2f8fe",
          100: "#FBEEE9",
          200: "#EDE0DB",
          300: "#D0C4C0",
          400: "#B4A9A5",
          500: "#998F8A",
          600: "#7F7571",
          700: "#655D59",
          800: "#4D4542",
          900: "#362F2C",
          1000: "#201A18",
          1100: "#1C1B1F29",
        },
        WhatsappAccent: {
          0: "rgba(240, 242, 245, 0.17)",
          50: "#fbfbfa",
          100: "#FBEEE9",
          200: "#EDE0DB",
          300: "#D0C4C0",
          400: "#B4A9A5",
          500: "#F0F2F5",
          600: "#7F7571",
          700: "#655D59",
          800: "#4D4542",
          900: "#362F2C",
          1000: "#201A18",
          1100: "#1C1B1F29",
        },
        // Incluye otros colores si es necesario...
        brand,
        secondary,
        gray,
        green,
      }
    : {
        // Modo Oscuro
        OrangeAccent: {
          100: "#341100",
          200: "#552000",
          300: "#793100",
          400: "#9F4200",
          500: "#C65400",
          600: "#F06700",
          700: "#FF8D4F",
          800: "#FFB692",
          900: "#FFDBCB",
          1000: "#FFEDE6",
        },
        BlueAccent: {
          100: "#001F27",
          200: "#003641",
          300: "#004E5E",
          400: "#27bcfd",
          500: "#00829B",
          600: "#009EBC",
          700: "#00BBDE",
          800: "#3DD7FC",
          900: "#B0ECFF",
          1000: "#DAF5FF",
        },
        YellowAccent: {
          100: "#221B00",
          200: "#3A3000",
          300: "#544600",
          400: "#6F5D00",
          500: "#8C7600",
          600: "#A98F00",
          700: "#C8A900",
          800: "#E6C52A",
          900: "#FFE168",
          1000: "#FFF0C1",
        },
        RedAccent: {
          100: "#410002",
          200: "#690005",
          300: "#93000A",
          400: "#BA1A1A",
          450: "#FF897D",
          500: "#DE3730",
          600: "#FF5449",
          700: "#FF897D",
          800: "#FFB4AB",
          900: "#FFDAD6",
          1000: "#FFEDEA",
        },
        GreenAccent: {
          100: "#002a18",
          200: "#005431",
          300: "#007e49",
          400: "#00a862",
          500: "#00d27a",
          600: "#33db95",
          700: "#66e4af",
          800: "#99edca",
          900: "#ccf6e4",
        },
        primary: {
          0: "#0b1727",
          10: "rgba(22, 34, 49, 1)",
          20: "#0F0E0D",
          50: "rgba(22, 34, 49, 1)",
          100: "#201A18",
          200: "#362F2C",
          300: "#4D4542",
          400: "#655D59",
          500: "#7F7571",
          600: "#998F8A",
          700: "#B4A9A5",
          800: "#D0C4C0",
          900: "#EDE0DB",
          1000: "#FBEEE9",
          1100: "#1C1B1F29",
        },
        WhatsappAccent: {
          0: "rgba(35, 47, 53, 1)",
          50: "#121e2d",
          100: "#201A18",
          200: "#362F2C",
          300: "#4D4542",
          400: "#655D59",
          500: "rgba(42, 56,67, 1)",
          600: "#998F8A",
          700: "#B4A9A5",
          800: "#D0C4C0",
          900: "#EDE0DB",
          1000: "#FBEEE9",
          1100: "#1C1B1F29",
        },
        // Incluye otros colores si es necesario...
        brand,
        secondary,
        gray,
        green,
      }),
});

// Función para obtener los ajustes del tema
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      primary: {
        main: colors.OrangeAccent[500],
        light: colors.brand[200],
        dark: colors.brand[800],
        contrastText: mode === "dark" ? colors.brand[100] : colors.brand[50],
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[300],
        dark: colors.secondary[800],
        contrastText:
          mode === "dark" ? colors.secondary[100] : colors.secondary[50],
      },
      warning: {
        main: "#F7B538",
        dark: "#F79F00",
        ...(mode === "dark" && { main: "#F7B538", dark: "#F79F00" }),
      },
      error: {
        light: red[50],
        main: red[500],
        dark: red[700],
        ...(mode === "dark" && {
          light: "#D32F2F",
          main: "#D32F2F",
          dark: "#B22A2A",
        }),
      },
      success: {
        light: colors.green[300],
        main: colors.green[400],
        dark: colors.green[800],
        ...(mode === "dark" && {
          light: colors.green[400],
          main: colors.green[500],
          dark: colors.green[700],
        }),
      },
      grey: {
        50: colors.gray[50],
        100: colors.gray[100],
        200: colors.gray[200],
        300: colors.gray[300],
        400: colors.gray[400],
        500: colors.gray[500],
        600: colors.gray[600],
        700: colors.gray[700],
        800: colors.gray[800],
        900: colors.gray[900],
      },
      divider:
        mode === "dark"
          ? alpha(colors.gray[600], 0.3)
          : alpha(colors.gray[300], 0.5),
      background: {
        default: "#fff",
        paper: gray[50],
        ...(mode === "dark" && { default: gray[900], paper: gray[800] }),
      },
      text: {
        primary: mode === "dark" ? "#fff" : colors.gray[800],
        secondary: mode === "dark" ? colors.gray[400] : colors.gray[600],
      },
      action: {
        selected: alpha(colors.brand[200], 0.2),
        selectederror: alpha("#D32F2F", 0.2),
        ...(mode === "dark" && {
          selected: alpha(colors.brand[800], 0.2),
        }),
      },
      // Puedes agregar más categorías de colores según sea necesario
    },
    typography: {
      fontFamily: `"Work Sans", "Calibri", sans-serif`,
      h1: {
        fontSize: 60,
        fontWeight: 600,
        lineHeight: 78 / 70,
        letterSpacing: -0.2,
      },
      h2: {
        fontSize: 48,
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: 42,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: 36,
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: 20,
        fontWeight: 600,
      },
      h6: {
        fontSize: 18,
        color: colors.primary[1000],
      },
      logo: {
        fontSize: 30,
        color: colors.green[400],
        fontFamily: "Calibri",
      },
      subtitle1: {
        fontSize: 18,
      },
      subtitle2: {
        fontSize: 16,
      },
      body1: {
        fontWeight: 400,
        fontSize: 15,
      },
      body2: {
        fontWeight: 400,
        fontSize: 14,
      },
      caption: {
        fontWeight: 400,
        fontSize: 12,
      },
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: () => ({
            padding: 8,
            overflow: "clip",
            backgroundColor: mode === "dark" ? colors.gray[900] : "#fff",
            border: "1px solid",
            borderColor: mode === "dark" ? colors.gray[800] : colors.gray[100],
            ":before": {
              backgroundColor: "transparent",
            },
            "&:first-of-type": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: () => ({
            border: "none",
            borderRadius: 8,
            "&:hover": {
              backgroundColor:
                mode === "dark" ? colors.gray[800] : colors.gray[100],
            },
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { marginBottom: 20, border: "none" },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: () => ({
            borderRadius: "10px",
            boxShadow: `0 4px 16px ${alpha(colors.gray[400], 0.2)}`,
            "& .Mui-selected": {
              color: mode === "dark" ? colors.gray[100] : colors.brand[500],
            },
            ...(mode === "dark" && {
              "& .Mui-selected": {
                color: "#fff",
              },
              boxShadow: `0 4px 16px ${alpha(colors.brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: () => ({
            padding: "12px 16px",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 500,
            ...(mode === "dark" && {
              color: colors.gray[400],
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
              "&.Mui-selected": { color: colors.brand[300] },
            }),
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: "border-box",
            transition: "all 100ms ease-in",
            "&:focus-visible": {
              outline: `3px solid ${alpha(colors.brand[500], 0.5)}`,
              outlineOffset: "2px",
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor:
              mode === "dark" ? alpha(colors.gray[800], 0.6) : colors.gray[50],
            borderRadius: 10,
            border: `1px solid ${
              mode === "dark"
                ? alpha(colors.gray[700], 0.3)
                : alpha(colors.gray[200], 0.8)
            }`,
            boxShadow: "none",
            transition: "background-color, border, 80ms ease",
            ...(ownerState.variant === "outlined" && {
              background:
                mode === "dark"
                  ? `linear-gradient(to bottom, ${colors.gray[900]}, ${alpha(
                      colors.gray[800],
                      0.5
                    )})`
                  : `linear-gradient(to bottom, #FFF, ${colors.gray[50]})`,
              "&:hover": {
                borderColor:
                  mode === "dark" ? colors.brand[700] : colors.brand[300],
                boxShadow:
                  mode === "dark"
                    ? `0 0 24px ${colors.brand[800]}`
                    : `0 0 24px ${colors.brand[100]}`,
              },
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: () => ({
            alignSelf: "center",
            padding: "6px 8px",
            // background:
            //   mode === "dark"
            //     ? `linear-gradient(to bottom right, ${colors.brand[700]}, ${colors.brand[900]})`
            //     : `linear-gradient(to bottom right, ${colors.brand[50]}, ${colors.brand[100]})`,
            border: "1px solid",
            borderColor:
              mode === "dark"
                ? alpha(colors.brand[500], 0.5)
                : alpha(colors.brand[500], 0.3),
            fontWeight: "600",
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? alpha(colors.brand[600], 0.5)
                  : alpha(colors.brand[400], 0.5),
            },
            "&:focus-visible": {
              borderColor:
                mode === "dark" ? colors.brand[200] : colors.brand[800],
              backgroundColor:
                mode === "dark" ? colors.brand[600] : colors.brand[200],
            },
            // "& .MuiChip-label": {
            //   color: mode === "dark" ? colors.brand[200] : colors.brand[500],
            // },
            "& .MuiChip-icon": {
              color: mode === "dark" ? colors.brand[200] : colors.brand[500],
            },
          }),
        },
      },

      // MuiButton: {
      //   styleOverrides: {
      //     root: ({ theme, ownerState }) => ({
      //       boxSizing: "border-box",
      //       boxShadow: "none",
      //       borderRadius: "10px",
      //       textTransform: "none",
      //       "&:active": {
      //         transform: "scale(0.98)",
      //       },
      //       ...(ownerState.size === "small" && {
      //         maxHeight: "32px",
      //       }),
      //       ...(ownerState.size === "medium" && {
      //         height: "40px",
      //       }),
      //       ...(ownerState.variant === "contained" &&
      //         ownerState.color === "primary" && {
      //           color: colors.OrangeAccent[50],
      //           background: colors.OrangeAccent[500],
      //           backgroundImage: `linear-gradient(to bottom, ${colors.OrangeAccent[400]}, ${colors.OrangeAccent[600]})`,
      //           boxShadow: `inset 0 1px ${alpha(colors.OrangeAccent[300], 0.4)}`,
      //           outline: `1px solid ${colors.OrangeAccent[700]}`,
      //           "&:hover": {
      //             background: colors.OrangeAccent[400],
      //             backgroundImage: "none",
      //             boxShadow: `0 0 0 1px  ${alpha(colors.OrangeAccent[300], 0.5)}`,
      //           },
      //         }),
      //       ...(ownerState.variant === "outlined" && {
      //         backgroundColor: alpha(brand[300], 0.1),
      //         borderColor: brand[300],
      //         color: brand[500],
      //         "&:hover": {
      //           backgroundColor: alpha(brand[300], 0.3),
      //           borderColor: brand[200],
      //         },
      //       }),

      //       ...(ownerState.variant === "text" && {
      //         color: brand[500],
      //         "&:hover": {
      //           backgroundColor: alpha(brand[300], 0.3),
      //           borderColor: brand[200],
      //         },
      //       }),
      //       ...(theme.palette.mode === "dark" && {
      //         ...(ownerState.variant === "outlined" && {
      //           backgroundColor: alpha(brand[600], 0.1),
      //           borderColor: brand[700],
      //           color: brand[300],
      //           "&:hover": {
      //             backgroundColor: alpha(brand[600], 0.3),
      //             borderColor: brand[700],
      //           },
      //         }),
      //         ...(ownerState.variant === "text" && {
      //           color: brand[300],
      //           "&:hover": {
      //             backgroundColor: alpha(brand[600], 0.3),
      //             borderColor: brand[700],
      //           },
      //         }),
      //       }),
      //     }),
      //   },
      // },
      MuiDivider: {
        styleOverrides: {
          root: () => ({
            borderColor:
              mode === "dark"
                ? alpha(colors.gray[700], 0.4)
                : alpha(colors.gray[200], 0.8),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
        styleOverrides: {
          root: () => ({
            color: mode === "dark" ? colors.brand[200] : colors.brand[600],
            fontWeight: 500,
            position: "relative",
            textDecoration: "none",
            "&::before": {
              content: '""',
              position: "absolute",
              width: 0,
              height: "1px",
              bottom: 0,
              left: 0,
              backgroundColor: colors.brand[200],
              opacity: 0.7,
              transition: "width 0.3s ease, opacity 0.3s ease",
            },
            "&:hover::before": {
              width: "100%",
              opacity: 1,
            },
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: () => ({
            borderRadius: "99px",
            color: mode === "dark" ? colors.gray[300] : colors.gray[500],
            fontWeight: 500,
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: () => ({
            backgroundImage: "none",
            backgroundColor:
              mode === "dark" ? alpha(colors.brand[100]) : colors.gray[100],
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: () => ({
            boxSizing: "border-box",
            width: 36,
            height: 24,
            padding: 0,
            transition: "background-color 100ms ease-in",
            "&:hover": {
              "& .MuiSwitch-track": {
                backgroundColor: colors.brand[600],
              },
            },
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                transform: "translateX(13px)",
              },
            },
            "& .MuiSwitch-track": {
              borderRadius: 50,
            },
            "& .MuiSwitch-thumb": {
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#FFF",
              width: 16,
              height: 16,
              margin: 2,
            },
          }),
          switchBase: {
            height: 24,
            width: 24,
            padding: 0,
            color: "#fff",
            "&.Mui-checked + .MuiSwitch-track": {
              opacity: 1,
            },
          },
        },
      },

      // Puedes agregar más sobrescrituras de componentes aquí según sea necesario
    },
  };
};

// Contexto para el modo de color
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

// Hook personalizado para manejar el modo de color
export const useMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.user.mode);

  const colorMode = {
    toggleColorMode: () => dispatch(toggleColorMode()),
  };

  const theme = createTheme(themeSettings(mode));

  return [theme, colorMode];
};
