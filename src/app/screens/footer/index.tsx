import { Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
interface FooterProps {
  count: number;
  setCount: (value: number) => void;
}

export default function Footer(props: FooterProps) {
  const history = useHistory();
  const { count, setCount } = props;
  const cartItem = count;

  //HANDLERS
  const handleUrlChange = () => {
    history.push("/cart");
  };
  return (
    <div className="footer-main-container">
      {cartItem !== 0 ? (
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
