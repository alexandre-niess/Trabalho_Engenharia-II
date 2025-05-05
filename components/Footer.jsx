import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "background.secondary",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          borderTop: "4px solid",
          borderColor: "decorations.divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/">
            <MenuBookIcon
              sx={{
                color: currentPath === "/" ? "primary.main" : "text.details",
              }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/carrinho">
            <ShoppingCartIcon
              sx={{
                color:
                  currentPath === "/carrinho" ? "primary.main" : "text.details",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
