import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

const pages = ["Book", "Author", "Publisher", "Category", "Borrowing"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        height: 80,
        display: { md: "flex", direction: "row", justifyContent: "center" },
        backgroundColor: "rgb(92, 64, 51)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="../../images/logo.png"
              alt="logo"
              width="20"
              style={{ marginRight: 5 }}
            />
            <Typography
              variant="h6"
              noWrap
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: "monospace",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: ".2rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              LIBRARY
            </Typography>
          </NavLink>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
              ml: "auto",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <NavLink
                  key={page}
                  onClick={handleCloseNavMenu}
                  style={{
                    my: 2,
                    display: "flex",
                    direction: "column",
                    fontFamily: "monospace",
                    fontSize: 16,
                    color: "black",
                    letterSpacing: 1.8,
                    marginRight: 16,
                    fontWeight: 700,
                    textDecoration: " none",
                    paddingLeft: 5,
                  }}
                  to={`/${page.toLowerCase()}`}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "auto",
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page}
                onClick={handleCloseNavMenu}
                style={{
                  my: 2,
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: 16,
                  color: "#fff",
                  letterSpacing: 1.8,
                  marginRight: 16,
                  fontWeight: 700,
                  textDecoration: " none",
                }}
                to={`/${page.toLowerCase()}`}
              >
                {page.toUpperCase()}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
