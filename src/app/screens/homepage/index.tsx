import { Button, Container, Stack, TextField } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import NewProducts from "./NewProducts";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes } from "./slice";
import { retrieveNewDishes, retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import ProductsService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export interface HomePageProps {
  cartItems: CartItem[];
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onAdd: (item: CartItem) => void;
}
export default function HomePage(props: HomePageProps) {
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;

  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const { setNewDishes } = actionDispatch(useDispatch());
  const { newDishes } = useSelector(newDishesRetriever);

  //HANDLERS
  const handleUrlChange = () => {
    history.push("/menu");
  };

  const handleUserName = (e: T) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const productService = new ProductsService();

    productService
      .getProducts({
        page: 1,
        limit: 3,
        order: "createdAt",
        productCollection: ProductCollection.PIZZA,
      })
      .then((data) => setNewDishes(data))
      .catch((err) => {
        console.log("Error, getProducts", err);
      });
  }, []);

  return (
    <>
      <div className="home-page-full-screen" style={{ flex: 1 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -2,
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/wX8foM1z7S0?autoplay=1&mute=1&loop=1&playlist=wX8foM1z7S0&controls=0&modestbranding=1&showinfo=0&rel=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          ></iframe>
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)", // darker = more visible text
              zIndex: 1,
            }}
          ></div>
        </div>

        <Container maxWidth="sm" className="home-page-content">
          <Stack>
            <div
              className="home-page-main"
              style={{
                position: "relative",
                zIndex: 2,
                color: "white",
                textShadow: "1px 1px 4px rgba(0,0,0,0.9)",
              }}
            >
              <div className="welcome">
                <h1>Your Pizza Party Starts Here!</h1>
                <h2>
                  Gather your friends and family and enjoy the best pizza in
                  town.
                </h2>
              </div>
              {/* 
              <div className="homePage-input-container">
                <p>👋 Welcome! Please start by telling us your name:</p>
                <TextField
                  onChange={handleUserName}
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue={inputValue}
                  variant="filled"
                  placeholder="Your full name"
                  sx={{
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "orange", // 🔴 default (normal state)
                    },
                    "& .MuiFilledInput-underline:hover:before": {
                      borderBottomColor: "orange", // 🟠 hover state
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "orange", // 🟢 focus state
                    },
                  }}
                />
              </div> */}
              {/* {inputValue.length !== 0 ? (
                <Button
                  className="continue-btn"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(255, 191, 0)",
                    color: "black",
                    fontWeight: 700,
                    marginTop: "30px",
                    borderRadius: "30px",
                    padding: "12px 24px",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    boxShadow: "0 8px 0 #c48f00, 0 12px 20px rgba(0,0,0,0.2)",
                    border: "3px solid black",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#ffd700",
                      transform: "scale(1.05) translateY(-2px)",
                      boxShadow:
                        "0 10px 0 #c48f00, 0 14px 22px rgba(0,0,0,0.3)",
                    },
                    "&:active": {
                      transform: "translateY(2px)",
                      boxShadow: "0 4px 0 #c48f00, 0 6px 10px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={handleUrlChange}
                >
                  CONTINUE ORDERING, {inputValue}
                </Button>
              ) : null} */}
            </div>
          </Stack>
        </Container>
      </div>

      <NewProducts
        cartItems={cartItems}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}
      />
    </>
  );
}
