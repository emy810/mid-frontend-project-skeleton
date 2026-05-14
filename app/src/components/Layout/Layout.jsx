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
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={hyfLogo} alt="HYF logo" style={{ height: 40 }} />
            </a>

            <Button
              color="inherit"
              component={Link}
              to="/events"
              sx={{ textTransform: "none" }}
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
                sx={{ textTransform: "none" }}
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
                  sx={{ textTransform: "none" }}
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
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/register"
                  sx={{ textTransform: "none" }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>

      <Paper
        square
        elevation={3}
        sx={{
          mt: 4,
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} HYF - Event Startup Project
        </Typography>
      </Paper>
    </>
  );
}
