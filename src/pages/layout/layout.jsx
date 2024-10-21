import { Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import NavbarDash from "src/components/Navbar/NavbarDash";

export const Layout = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: 4 }}>
      <NavbarDash />
      <Outlet />
    </Container>
  );
};
