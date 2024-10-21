import {
  Avatar,
  Box,
  DialogTitle,
  Drawer,
  Dropdown,
  IconButton,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  ModalClose,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import * as React from "react";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { useDispatch, useSelector } from "react-redux";
import { toggleColorMode } from "src/store/slices/userSlice";

// Importa la función de cierre de sesión de Firebase
import { signOut } from "firebase/auth";
import { auth } from "src/services/firebase-config"; // Asegúrate de que el auth está correctamente configurado

function ColorSchemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.user.mode);

  return (
    <Tooltip title="Cambiar tema" variant="outlined">
      <IconButton
        data-screenshot="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => dispatch(toggleColorMode())}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function NavbarDash() {
  const [open, setOpen] = React.useState(false);

  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cierra la sesión en Firebase
      localStorage.removeItem("token-sena"); // Limpia el token del almacenamiento local
      localStorage.removeItem("user"); // Limpia el token del almacenamiento local
      window.location.href = "/"; // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        {/* Aquí puedes añadir más botones de navegación */}
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Aprende Redes Solidarias.</DialogTitle>
          <Box sx={{ px: 1 }}>{/* <Navigation /> */}</Box>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Rick Sanchez
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    rick@email.com
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Ayuda
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Configuración
            </MenuItem>
            <ListDivider />
            {/* Menú para cerrar sesión */}
            <MenuItem onClick={handleSignOut}>
              <LogoutRoundedIcon />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
