import { Button, Container, Stack } from "@mui/material";

export default function Footer() {
  const cartItem = [];
  return (
    <div className="footer-main-container">
      {cartItem.length !== 0 ? (
        <Container>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <div className="navbar-btn-container">
              <p>1 PIZZAS</p>
              <p>$12.00</p>
            </div>
            <div>
              <Button variant="text">OPEN CART</Button>
            </div>
          </Stack>
        </Container>
      ) : null}
    </div>
  );
}
