// App.js
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ColorModeContext, useMode } from "./assets/theme"; // Asegúrate de que la ruta es correcta
import { routesSENA } from "./routes";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español

function App() {
  dayjs.locale("es"); // Establece el idioma globalmente a español
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={routesSENA} />
        </ThemeProvider>
      </LocalizationProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
