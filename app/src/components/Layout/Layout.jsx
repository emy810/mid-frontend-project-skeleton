import { Link, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Container,
  Paper,
} from "@mui/material";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          color="primary"
          sx={{ backgroundColor: "primary.main" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <a
                href="https://www.hackyourfuture.dk/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={hyfLogo} alt="HYF logo" style={{ height: 65 }} />
              </a>

              <Button
                color="inherit"
                component={Link}
                to="/events"
                sx={{
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Events
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                sx={{ position: "relative" }}
              >
                <Badge badgeContent={cartCount} color="error">
                  <FaShoppingCart size={20} />
                </Badge>
              </IconButton>
              {user && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/orders"
                  sx={{
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  My Orders
                </Button>
              )}

              {user ? (
                <>
                  <Typography>{user.email}</Typography>
                  <Button
                    color="inherit"
                    onClick={logout}
                    sx={{
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                    sx={{
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 2, mb: 4, flex: 1 }}>
          <Outlet />
        </Container>

        <Paper
          square
          elevation={3}
          sx={{
            mt: 4,
            py: 2,
            textAlign: "center",
            border: "5px solid #2563eb",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "1.1rem", fontWeight: 500 }}
          >
            © {new Date().getFullYear()} HYF - Event Startup Project
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
