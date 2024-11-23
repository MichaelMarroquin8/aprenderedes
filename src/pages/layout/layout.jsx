import { alpha, Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavbarDash from "src/components/Navbar/NavbarDash";

export const Layout = () => {
  return (
    <Box
      id="ApiReference"
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh", // Asegura que el fondo cubra toda la pantalla
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #a6d98d, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 1)})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 7, md: 4 },
        }}
      >
        <NavbarDash />
        <Outlet />
      </Container>
    </Box>
  );
};
