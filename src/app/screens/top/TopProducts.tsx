import { Button, Container, Stack } from "@mui/material";

export default function TopProducts() {
  const arr = [1, 2, 3];
  return (
    <div className="top-products-screen" style={{ flex: 1 }}>
      <Container className="top-products-container">
        <img
          src="/img/absoluteImages/grip1.png"
          alt="Pizza Backgrounds"
          className="absolute-img1"
        />
        <img
          src="/img/absoluteImages/grip2.png"
          alt="Pizza Background"
          className="absolute-img2"
        />
        <img
          src="/img/absoluteImages/pomidor1.png"
          alt="Pizza Background"
          className="absolute-img3"
        />
        <img
          src="/img/absoluteImages/qalampir.png"
          alt="Pizza Background"
          className="absolute-img4"
        />
        <img
          src="/img/absoluteImages/shigimchi2.png"
          alt="Pizza Background"
          className="absolute-img5"
        />
        <img
          src="/img/absoluteImages/shigimchi.png"
          alt="Pizza Background"
          className="absolute-img6"
        />
        <Stack>
          <div className="top-products-intro">
            <div>
              <h1>Fan Favorites</h1>
            </div>
            <div>
              <p>
                From classic combinations to bold flavors, these pizzas top our
                list for a reason.
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
