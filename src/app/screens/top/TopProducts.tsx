import { Button, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "../homepage/selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { TopProps } from ".";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    popularDishes,
  })
);
// const { popularDishes } = useSelector(popularDishesRetriever);
export default function TopProducts(props: TopProps) {
  const { onAdd } = props;
  const { popularDishes } = useSelector(popularDishesRetriever);
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
            {popularDishes.map((product) => {
              const imgPath = `${serverApi}/${product.productImages}`;
              return (
                <div className="cart-item-cont" key={product._id}>
                  <div className="cart-img-container">
                    <img src={imgPath} alt="" />
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
