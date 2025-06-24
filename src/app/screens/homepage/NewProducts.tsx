import { Button, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewProducts() {
  const { newDishes } = useSelector(newDishesRetriever);
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
                Discover our latest arrivals - fresh, stylish, and just for you.
              </p>
            </div>
          </div>

          <div className="cart-main-container">
            {newDishes.map((item: Product) => {
              console.log("productImages:", item.productImages);
              const imagePath = `${serverApi}/${item.productImages}`;
              return (
                <div className="cart-item-cont" key={item._id}>
                  <div className="cart-img-container">
                    <img src={imagePath} alt="" />
                  </div>

                  <div className="cart-product-info-container">
                    <h2>{item.productName}</h2>
                    <p>{item.productIngredients}</p>
                    <div className="cart-product-info-order">
                      <Button variant="text" sx={{ fontWeight: 600 }}>
                        Order Now
                      </Button>
                      <span>from ${item.productPrice}</span>
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
