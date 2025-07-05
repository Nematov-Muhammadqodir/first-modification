import { Button, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { HomePageProps } from ".";
import { useGlobals } from "../../hooks/useGlobals";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewProducts(props: HomePageProps) {
  const { authMember } = useGlobals();
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;

  const { newDishes } = useSelector(newDishesRetriever);
  const arr = [1, 2, 3];
  return (
    <div
      className="top-products-screen"
      style={{
        flex: 1,
        backgroundColor: "#fffbe6", // Yellowish background
        // marginTop: "70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🎉 Emoji Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[
          "🍕",
          "🍔",
          "🌭",
          "🍟",
          "🧀",
          "🥓",
          "🍗",
          "🥪",
          "🍳",
          "🥞",
          "🍩",
          "🍪",
          "🍕",
          "🍔",
          "🍔",
        ].map((emoji, index) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          return (
            <span
              key={index}
              style={{
                position: "absolute",
                left: `${randomX}%`,
                top: `${randomY}%`,
                fontSize: "5.5rem",
                opacity: 0.7,
                transition: "transform 0.4s ease, opacity 1s ease",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                const emojis = [
                  "🍕",
                  "🍔",
                  "🌭",
                  "🍟",
                  "🧀",
                  "🥓",
                  "🍗",
                  "🥪",
                  "🍳",
                  "🥞",
                  "🍩",
                  "🍪",
                  "🍰",
                  "🍫",
                  "🍿",
                ];
                const randomEmoji =
                  emojis[Math.floor(Math.random() * emojis.length)];
                e.currentTarget.textContent = randomEmoji;

                (e.currentTarget as HTMLSpanElement).style.opacity = "1.1";
                (e.currentTarget as HTMLSpanElement).style.transform =
                  "translateY(-15px) scale(1.4) rotate(20deg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.opacity = "0.2";
                (e.currentTarget as HTMLSpanElement).style.transform = "none";
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>

      {/* 🔽 Your original content starts here */}
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
                <div
                  className="cart-item-cont"
                  key={product._id}
                  style={{
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) => {
                    const container = e.currentTarget as HTMLDivElement;
                    container.style.transform = "scale(1.03)";
                    const img = container.querySelector(
                      "img"
                    ) as HTMLImageElement;
                    if (img) {
                      img.style.transition = "transform 0.6s ease";
                      img.style.transform = "rotate(360deg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const container = e.currentTarget as HTMLDivElement;
                    container.style.transform = "scale(1)";
                    const img = container.querySelector(
                      "img"
                    ) as HTMLImageElement;
                    if (img) {
                      img.style.transform = "rotate(0deg)";
                    }
                  }}
                >
                  <div className="cart-img-container">
                    <img src={imagePath} alt="" />
                  </div>

                  <div className="cart-product-info-container">
                    <h2>{product.productName}</h2>
                    <p>{product.productIngredients}</p>
                    <div className="cart-product-info-order">
                      {authMember ? (
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
                      ) : null}

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
