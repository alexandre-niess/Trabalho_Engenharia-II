import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CardAdmin from "../../../components/CardAdmin";
import Button from "@mui/material/Button";

const Cardapio = ({ restaurant }) => {
  const produtosMockados = restaurant.produtos;
  const adicionaisMockados = restaurant.adicionais;
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("nome");
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchFieldChange = (field) => {
    setSearchField(field);
    setMenuOpen(false);
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const value = item[searchField]?.toString().toLowerCase() || "";
      return value.includes(searchQuery.toLowerCase());
    });
  };

  const handleClickAway = () => {
    setMenuOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "background.secondary" }}>
      {/* Barra fixa com abas, similar ao restaurante */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "background.secondary",
          boxShadow: (theme) =>
            `0px 20px 20px -15px ${theme.palette.background.secondary}`,
        }}
      >
        {/* Título, ocultado em telas pequenas */}
        <Typography
          variant="h4"
          sx={{
            marginTop: "30px",
            display: { xs: "none", sm: "block" },
          }}
        >
          Cardápio
        </Typography>

        {/* Tabs principais com scroll no mobile */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="cardápio tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            marginTop: { xs: "60px", sm: "0px" },
            borderBottom: 1,
            borderColor: "divider",
            overflowX: "auto",
          }}
        >
          <Tab label="Produtos" />
          <Tab label="Adicionais" />
          <Tab label={isMobile ? "Categorias" : "Categorias & Promoções"} />
          {isMobile && <Tab label="Promoções" />}
        </Tabs>
      </Box>

      <Container sx={{ marginTop: "100px", paddingBottom: 4 }}>
        {/* Conteúdo para Produtos */}
        {tabIndex === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: isMobile ? "space-between" : "",
                    marginTop: isMobile ? "" : "20px",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ marginTop: isMobile ? "10px" : "10px" }}
                  >
                    Produtos
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: isMobile ? "10px" : 0,
                      alignSelf: isMobile ? "flex-start" : "center",
                    }}
                  >
                    Incluir produto
                  </Button>
                </Box>

                <ClickAwayListener onClickAway={handleClickAway}>
                  <Box
                    sx={{
                      position: "relative",
                      width: isMobile ? "100%" : "auto",
                      marginTop: isMobile ? 2 : 0,
                    }}
                  >
                    <TextField
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Buscar produtos..."
                      sx={{
                        width: isMobile ? "100%" : "400px",
                        marginLeft: isMobile ? 0 : "auto",
                        marginTop: isMobile ? 0 : "15px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "200px",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setMenuOpen((prev) => !prev)}
                            >
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {menuOpen && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          backgroundColor: "white",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                          zIndex: 999,
                          width: "200px",
                        }}
                      >
                        <MenuItem
                          onClick={() => handleSearchFieldChange("nome")}
                        >
                          Nome
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("descricao")}
                        >
                          Descrição
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("preco")}
                        >
                          Preço
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("alergenicos")}
                        >
                          Alérgenos
                        </MenuItem>
                      </Box>
                    )}
                  </Box>
                </ClickAwayListener>
              </Box>

              <Grid container spacing={2}>
                {filterItems(produtosMockados).map((produto, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardAdmin
                      nome={produto.nome}
                      preco={produto.preco}
                      imagemPrato={produto.imagemPrato}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Conteúdo para Adicionais */}
        {tabIndex === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: isMobile ? "space-between" : "",
                    marginTop: isMobile ? "" : "20px",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ marginTop: isMobile ? "10px" : "10px" }}
                  >
                    Adicionais
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: isMobile ? "10px" : 0,
                      alignSelf: isMobile ? "flex-start" : "center",
                    }}
                  >
                    Incluir adicional
                  </Button>
                </Box>

                <ClickAwayListener onClickAway={handleClickAway}>
                  <Box
                    sx={{
                      position: "relative",
                      width: isMobile ? "100%" : "auto",
                      marginTop: isMobile ? 2 : 0,
                    }}
                  >
                    <TextField
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Buscar adicionais..."
                      sx={{
                        width: isMobile ? "100%" : "400px",
                        marginLeft: isMobile ? 0 : "auto",
                        marginTop: isMobile ? 0 : "15px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "200px",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setMenuOpen((prev) => !prev)}
                            >
                              <ArrowDropDownIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {menuOpen && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          backgroundColor: "white",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                          zIndex: 999,
                          width: "200px",
                        }}
                      >
                        <MenuItem
                          onClick={() => handleSearchFieldChange("nome")}
                        >
                          Nome
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("descricao")}
                        >
                          Descrição
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("preco")}
                        >
                          Preço
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleSearchFieldChange("alergenicos")}
                        >
                          Alérgenos
                        </MenuItem>
                      </Box>
                    )}
                  </Box>
                </ClickAwayListener>
              </Box>

              <Grid container spacing={2}>
                {filterItems(adicionaisMockados).map((adicional, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardAdmin
                      nome={adicional.nome}
                      preco={adicional.preco}
                      imagemPrato={adicional.imagemPrato}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Conteúdo para Categorias e Promoções */}
        {tabIndex === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Categorias e Promoções</Typography>
            {/* Adicione o conteúdo das categorias e promoções aqui */}
          </Box>
        )}

        {isMobile && tabIndex === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Promoções</Typography>
            {/* Adicione o conteúdo de promoções aqui */}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Cardapio;
