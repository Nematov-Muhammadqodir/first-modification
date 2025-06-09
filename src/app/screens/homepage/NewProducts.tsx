import { Button, Container, Stack } from "@mui/material";

export default function NewProducts() {
  const arr = [1, 2, 3];
  return (
    <div
      className="top-products-screen"
      style={{ flex: 1, backgroundColor: "whitesmoke", marginTop: "70px" }}
    >
      <Container className="top-products-container">
        <Stack>
          <div className="top-products-intro">
            <div>
              <h1>Top Products</h1>
            </div>
            <div>
              <p>
                Discover our latest arrivals – fresh, stylish, and just for you.
              </p>
            </div>
          </div>

          <div className="cart-main-container">
            {arr.map((item) => {
              return (
                <div className="cart-item-cont">
                  <div className="cart-img-container">
                    <img src="/img/top-pizzas/top-pizza1.png" alt="" />
                  </div>

                  <div className="cart-product-info-container">
                    <h2>Pepperoni Popper</h2>
                    <p>
                      Double pepperoni, mozzarella, spicy marinara sauce,
                      crushed red pepper, black olives
                    </p>
                    <div className="cart-product-info-order">
                      <Button variant="text" sx={{ fontWeight: 600 }}>
                        Order Now
                      </Button>
                      <span>from $14.99</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
