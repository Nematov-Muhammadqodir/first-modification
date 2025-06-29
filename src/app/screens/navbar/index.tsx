import { Button, Container, Stack } from "@mui/material";
import { relative } from "path";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const authMember = null;
  return (
    <div className="navbar-main-container">
      <Container>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="navbar-container"
        >
          <div>
            <a className="navbar-logo" href="/">
              Kevin Pizza's
            </a>
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", gap: 50 }}
            className="navLinks"
          >
            <div className="fan_favorites">
              <NavLink style={{}} to="/top/products">
                Fan Favorites
              </NavLink>
            </div>
            <div>
              <NavLink to="/menu">Menu</NavLink>
            </div>
            <div>
              <NavLink to="/cart">Cart</NavLink>
            </div>
            <div>
              <NavLink to="/help">Help</NavLink>
            </div>
          </div>

          {/* {authMember ? (
            <input
              placeholder="Search order"
              type="text"
              className="navbar-input"
            />
          ) : (
            ""
          )} */}
          <div className="btn-container">
            <Button className="login-button" variant="contained">
              Login
            </Button>
            <Button className="signup-button" variant="contained">
              Signup
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
