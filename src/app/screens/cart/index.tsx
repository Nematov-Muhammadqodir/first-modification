import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface CartInterface {
  count: number;
}
export default function Cart(props: CartInterface) {
  const { count } = props;
  const cartItem = [1, 2, 3];
  const [cartItems, setCartItems] = useState(cartItem);
  const history = useHistory();

  //HANDLERS
  const handleDeletAll = () => {
    setCartItems([]);
  };

  const handleBackMenu = () => {
    history.push("/menu");
  };
  const handleCartInfoUrl = () => {
    history.push("/cart/new");
  };

  return (
    <div style={{ flex: 1, marginTop: "40px" }}>
      <img
        src="/pizzaImages/11040007.png"
        alt="Pizza Background"
        className="menu-responsive-bg-image"
      />
      <Container maxWidth="md">
        {cartItems.length !== 0 ? (
          <Stack>
            <Button
              variant="text"
              sx={{
                color: "rgba(255, 191, 0, 0.98)",
                fontWeight: "100px",
                justifyContent: "flex-start",
              }}
              onClick={handleBackMenu}
            >
              Back to menu
            </Button>

            <h2>Your cart</h2>

            {cartItems.map((item, index) => {
              return (
                <Stack
                  className="cart-item-container"
                  key={index}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  sx={{ marginBottom: "20px" }}
                >
                  <Stack
                    sx={{ fontWeight: "600", letterSpacing: "1px" }}
                    flexDirection={"row"}
                    gap={"20px"}
                    alignItems={"center"}
                  >
                    <span>1x</span>
                    <p>Margherita</p>
                  </Stack>

                  <div className="price-count-container">
                    <span className="cart-item-price">€12.00</span>
                    <Button variant="contained">-</Button>
                    <p>{count}</p>
                    <Button variant="contained">+</Button>
                    <Button variant="contained">DELETE</Button>
                  </div>
                </Stack>
              );
            })}

            <Stack flexDirection={"row"} gap={"20px"}>
              <Button
                className="order-button"
                variant="contained"
                onClick={handleCartInfoUrl}
              >
                Order
              </Button>
              <Button
                className="clear-button"
                variant="outlined"
                onClick={handleDeletAll}
              >
                Clear cart
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <Box className="empty-message">
              🍕 Your cart is empty. Let's order something tasty!
            </Box>
            <Button
              variant="text"
              sx={{
                color: "rgba(255, 191, 0, 0.98)",
                fontWeight: "100px",
                justifyContent: "flex-start",
              }}
              onClick={handleBackMenu}
            >
              Back to menu
            </Button>
          </Stack>
        )}
      </Container>
    </div>
  );
}
