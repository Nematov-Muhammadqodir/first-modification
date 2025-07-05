import {
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { relative } from "path";
import { NavLink } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface NavbarProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}
export default function Navbar(props: NavbarProps) {
  const {
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();
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

            {authMember ? (
              <div>
                <NavLink to="/cart">Cart</NavLink>
              </div>
            ) : null}

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
          {!authMember ? (
            <div className="btn-container">
              <Button
                className="login-button"
                variant="contained"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
              <Button
                className="signup-button"
                variant="contained"
                onClick={() => setSignupOpen(true)}
              >
                Signup
              </Button>
            </div>
          ) : (
            <img
              style={{ width: "50px", height: "50px", borderRadius: "50px" }}
              className="user-avatar"
              src={
                authMember.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
              }
              aria-haspopup={"true"}
              onClick={handleLogoutClick}
            />
          )}

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: "red" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Container>
    </div>
  );
}
