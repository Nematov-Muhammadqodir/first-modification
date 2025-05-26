import { Button, Container, Stack } from "@mui/material";
import { relative } from "path";

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

          {authMember ? (
            <input
              placeholder="Search order"
              type="text"
              className="navbar-input"
            />
          ) : (
            ""
          )}
          <div className="btn-container">
            <Button variant="contained">Login</Button>
            <Button variant="contained">Signup</Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
