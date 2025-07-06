import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useBasket from "../../hooks/useBasket";
import { CartItem } from "../../../lib/types/search";

interface CartProps {
  cartItems: CartItem[];
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onAdd: (item: CartItem) => void;
}
export default function Cart(props: CartProps) {
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;
  const [cartItem, setCartItems] = useState(cartItems);
  const history = useHistory();

  const itemsPrice: number = cartItems.reduce((acc: number, cur: CartItem) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = itemsPrice + shippingCost;

  //HANDLERS

  const handleBackMenu = () => {
    history.push("/menu");
  };
  const handleCartInfoUrl = () => {
    history.push("/cart/new");
  };

  return (
    <div style={{ flex: 1, marginTop: "120px" }}>
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

            {cartItems.map((product, index) => {
              return (
                <Stack
                  className="cart-item-container"
                  key={product._id}
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
                    <span>{product.quantity}x</span>
                    <p>{product.name}</p>
                  </Stack>

                  <div className="price-count-container">
                    <span className="cart-item-price">
                      €{product.price.toFixed(2)}
                    </span>
                    <Button
                      variant="contained"
                      onClick={() =>
                        onRemove({
                          _id: product._id,
                          quantity: 1,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                    >
                      -
                    </Button>
                    {/* <p>{count}</p> */}
                    <Button
                      variant="contained"
                      onClick={() =>
                        onAdd({
                          _id: product._id,
                          quantity: 1,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        onDelete({
                          _id: product._id,
                          quantity: 1,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                    >
                      DELETE
                    </Button>
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
                <NavLink to="/cart/new/:orderId">Order</NavLink>
              </Button>
              <Button
                className="clear-button"
                variant="outlined"
                onClick={onDeleteAll}
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
