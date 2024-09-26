import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppStore } from "../appStore";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const { logout } = useAuth();

  const navigated = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            height={65}
            padding={2}
            color="inherit"
            component="div"
          >
            ESPOLETA Tecnología
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Esto empuja el botón hacia la derecha */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleLogout()}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
