import { Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import useBasket from "../../hooks/useBasket";

interface FooterProps {
  cartItems: CartItem[];
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onAdd: (item: CartItem) => void;
}

export default function Footer(props: FooterProps) {
  const history = useHistory();
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  //HANDLERS
  const handleUrlChange = () => {
    history.push("/cart");
  };

  return (
    <div className="footer-main-container">
      {cartItems.length !== 0 ? (
        <Container>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <div className="navbar-btn-container">
              <p>{totalQuantity} ITEMS</p>
              <p>${totalPrice}</p>
            </div>
            <div>
              <Button
                onClick={handleUrlChange}
                sx={{ color: "white" }}
                variant="text"
              >
                OPEN CART
              </Button>
            </div>
          </Stack>
        </Container>
      ) : null}
    </div>
  );
}
