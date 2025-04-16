import React, { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import Restaurante from "./screens/Restaurante";
import Cardapio from "./screens/Cardapio";
import { Box, Typography, Toolbar, CssBaseline } from "@mui/material";
import { restaurantMock } from "./screens/dadosmockados";

import Construction from "./screens/Construction";

const MainController = () => {
  const [activeScreen, setActiveScreen] = useState("Restaurante");

  const options = [
    { label: "Restaurante", icon: "IconThree" },
    { label: "Cardápio", icon: "IconTwo" },
    { label: "Pedidos", icon: "IconFour" },
    { label: "Fidelidade", icon: "IconOne" },
    { label: "Cupons", icon: "IconFive" },
    { label: "Atendimento", icon: "IconSix" },
  ];

  const renderContent = () => {
    switch (activeScreen) {
      case "Restaurante":
        return <Restaurante restaurant={restaurantMock} />;
      case "Cardápio":
        return <Cardapio restaurant={restaurantMock} />;
      case "Pedidos":
        return <Construction />;
      case "Fidelidade":
        return <Construction />;
      case "Cupons":
        return <Construction />;
      case "Atendimento":
        return <Construction />;
      default:
        return <Construction />;
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", backgroundColor: "background.secondary" }}>
        <SidebarMenu
          options={options}
          activeScreen={activeScreen}
          onSelect={setActiveScreen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            ml: { md: 0 },
            mt: { xs: "-50px", md: 0 },
          }}
        >
          <Toolbar />

          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default MainController;
