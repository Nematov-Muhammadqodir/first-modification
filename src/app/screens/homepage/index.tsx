import { Button, Container, Stack, TextField } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { T } from "../../../lib/types/common";
import NewProducts from "./NewProducts";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes } from "./slice";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function HomePage() {
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

  useEffect(() => {}, []);

  console.log("serverAPI", serverApi);

  return (
    <>
      <div className="home-page-full-screen" style={{ flex: 1 }}>
        <img
          src="/pizzaImages/11039274.png"
          alt="Pizza Background"
          className="responsive-bg-image"
        />
        <Container maxWidth="sm" className="home-page-content">
          <Stack>
            <div className="home-page-main">
              <div className="welcome">
                <h1>Your Pizza Party Starts Here!</h1>
                <h2>
                  Gather your friends and family and enjoy the best pizza in
                  town. Freshly made and delivered hot!
                </h2>
              </div>

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
              </div>
              {inputValue.length !== 0 ? (
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
              ) : null}
            </div>
          </Stack>
        </Container>
      </div>

      <NewProducts />
    </>
  );
}
