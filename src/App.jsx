// App.js
import { ThemeProvider } from "@mui/joy/styles";
import { RouterProvider } from "react-router-dom";
import { ColorModeContext, useMode } from "./assets/theme"; // Asegúrate de que la ruta es correcta
import { routesAIO } from "./routes";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routesAIO} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
