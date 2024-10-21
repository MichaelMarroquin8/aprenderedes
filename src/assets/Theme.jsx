import { extendTheme } from "@mui/joy/styles";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorMode } from "src/store/slices/userSlice";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "light"
    ? {
        primary: {
          0: "#d7eecc",
          100: "#d7eecc",
          200: "#b0dd99",
          300: "#88cb66",
          400: "#61ba33",
          500: "#39a900",
          600: "#2e8700",
          700: "#226500",
          800: "#174400",
          900: "#0b2200",
        },
        secondary: {
          100: "#cce4d6",
          200: "#99c9ad",
          300: "#66ae84",
          400: "#33935b",
          500: "#007832",
          600: "#006028",
          700: "#00481e",
          800: "#003014",
          900: "#00180a",
        },

        purple: {
          100: "#e3d4e4",
          200: "#c6a9ca",
          300: "#aa7daf",
          400: "#8d5295",
          500: "#71277a",
          600: "#5a1f62",
          700: "#441749",
          800: "#2d1031",
          900: "#170818",
        },

        yellow: {
          100: "#fff3cc",
          200: "#fee799",
          300: "#fedb66",
          400: "#fdcf33",
          500: "#fdc300",
          600: "#ca9c00",
          700: "#987500",
          800: "#654e00",
          900: "#332700",
        },
        blue: {
          100: "#ccd6db",
          200: "#99acb8",
          300: "#668394",
          400: "#335971",
          500: "#00304d",
          600: "#00263e",
          700: "#001d2e",
          800: "#00131f",
          900: "#000a0f",
        },
        blueLight: {
          100: "#dcfafe",
          200: "#b9f5fd",
          300: "#96effb",
          400: "#73eafa",
          500: "#50e5f9",
          600: "#40b7c7",
          700: "#308995",
          800: "#205c64",
          900: "#102e32",
        },
      }
    : {
        primary: {
          0: "#d7eecc",
          100: "#0b2200",
          200: "#174400",
          300: "#226500",
          400: "#2e8700",
          500: "#39a900",
          600: "#61ba33",
          700: "#88cb66",
          800: "#b0dd99",
          900: "#d7eecc",
        },
        secondary: {
          100: "#00180a",
          200: "#003014",
          300: "#00481e",
          400: "#006028",
          500: "#007832",
          600: "#33935b",
          700: "#66ae84",
          800: "#99c9ad",
          900: "#cce4d6",
        },

        purple: {
          100: "#170818",
          200: "#2d1031",
          300: "#441749",
          400: "#5a1f62",
          500: "#71277a",
          600: "#8d5295",
          700: "#aa7daf",
          800: "#c6a9ca",
          900: "#e3d4e4",
        },

        yellow: {
          100: "#332700",
          200: "#654e00",
          300: "#987500",
          400: "#ca9c00",
          500: "#fdc300",
          600: "#fdcf33",
          700: "#fedb66",
          800: "#fee799",
          900: "#fff3cc",
        },
        blue: {
          100: "#000a0f",
          200: "#00131f",
          300: "#001d2e",
          400: "#00263e",
          500: "#00304d",
          600: "#335971",
          700: "#668394",
          800: "#99acb8",
          900: "#ccd6db",
        },
        blueLight: {
          100: "#102e32",
          200: "#205c64",
          300: "#308995",
          400: "#40b7c7",
          500: "#50e5f9",
          600: "#73eafa",
          700: "#96effb",
          800: "#b9f5fd",
          900: "#dcfafe",
        },
      }),
});

// Joy UI theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            solidBg: colors.primary[500], // Color sólido de fondo
            solidHoverBg: colors.primary[600], // Color al hacer hover
            solidActiveBg: colors.primary[700], // Color al hacer click
          },
          neutral: {
            solidBg: colors.blue[500], // Definir colores para neutral
            solidHoverBg: colors.blue[600],
            solidActiveBg: colors.blue[700],
          },
          background: {
            body: "radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(105,235,39,1) 100%)",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            solidBg: colors.primary[500],
            solidHoverBg: colors.primary[600],
            solidActiveBg: colors.primary[700],
          },
          background: {
            body: "radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(105,235,39,1) 100%)",
          },
        },
      },
    },
    typography: {
      fontFamily: '"Work Sans", "Calibri", sans-serif',
      h1: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 700,
        fontSize: "2rem",
        letterSpacing: "0.015em",
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 600,
        fontSize: "1.75rem",
        letterSpacing: "0.015em",
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 500,
        fontSize: "1.5rem",
        letterSpacing: "0.015em",
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 500,
        fontSize: "1.25rem",
        letterSpacing: "0.015em",
        lineHeight: 1.5,
      },
      h5: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 400,
        fontSize: "1rem",
        letterSpacing: "0.015em",
        lineHeight: 1.6,
      },
      h6: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 400,
        fontSize: "0.875rem",
        letterSpacing: "0.015em",
        lineHeight: 1.7,
      },
      body1: {
        fontFamily: '"Calibri", sans-serif',
        fontWeight: 300,
        fontSize: "1rem",
        letterSpacing: "0.015em",
        lineHeight: 1.5,
      },
      body2: {
        fontFamily: '"Calibri", sans-serif',
        fontWeight: 300,
        fontSize: "0.875rem",
        letterSpacing: "0.015em",
        lineHeight: 1.6,
      },
      caption: {
        fontFamily: '"Calibri", sans-serif',
        fontWeight: 300,
        fontSize: "0.75rem",
        letterSpacing: "0.015em",
        lineHeight: 1.7,
      },
      button: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 500,
        fontSize: "0.875rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
      overline: {
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 400,
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      },
    },
  });
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.user.mode);

  const colorMode = {
    toggleColorMode: () => dispatch(toggleColorMode()),
  };

  const theme = themeSettings(mode); // Usar el modo dinámicamente

  return [theme, colorMode];
};
