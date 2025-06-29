import { Button, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { HomePageProps } from ".";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewProducts(props: HomePageProps) {
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;

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
            {newDishes.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages}`;
              return (
                <div className="cart-item-cont" key={product._id}>
                  <div className="cart-img-container">
                    <img src={imagePath} alt="" />
                  </div>

                  <div className="cart-product-info-container">
                    <h2>{product.productName}</h2>
                    <p>{product.productIngredients}</p>
                    <div className="cart-product-info-order">
                      <Button
                        variant="text"
                        sx={{ fontWeight: 600 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages,
                          });
                        }}
                      >
                        Order Now
                      </Button>
                      <span>from ${product.productPrice}</span>
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
