import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Dividerr from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";

import { createSelector } from "reselect";

import { useParams } from "react-router-dom";
import axios from "axios";
import ProductService from "../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";
import { setChosenProduct } from "./slice";
import { retrieveChosenProduct } from "./selector";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeService from "../../services/LikeService";
import { useGlobals } from "../../hooks/useGlobals";

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

interface MenuProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenMenu(props: MenuProps) {
  const { onAdd } = props;
  const { authMember } = useGlobals();

  const { setChosenProduct } = actionDispatch(useDispatch());
  const { productId } = useParams<{ productId: string }>();
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const [likes, setLikes] = useState<boolean>(false);
  const [likeRefId, setLikeRefId] = useState<string>("");
  console.log("likes boolean", likes);

  const handleLikeToggle = (id: string) => {
    setLikeRefId(id); // ✅ this will trigger useEffect if id changes
  };

  const handleLikeButton = (value: boolean) => {
    setLikes(value);
  };

  useEffect(() => {
    const product = new ProductService();

    product
      .getProduct(productId)
      .then((data) => {
        console.log("data", data);
        setChosenProduct(data);
      })
      .catch((err) => console.log("Error, getProduct", err));
  }, []);

  useEffect(() => {
    if (!likeRefId) return; // ✅ prevent running on mount

    const likeService = new LikeService();
    likeService
      .toggleLike(likeRefId)
      .then((data) => {
        console.log("like data", data);
        handleLikeButton(data.like);

        handleLikeToggle("");
      })
      .catch((err) => {
        console.log("Error, toggleLike", err);
      });
  }, [likeRefId]);

  const imagePath = `${serverApi}/${chosenProduct?.productImages}`;

  return (
    <div className={"chosen-product"} style={{ marginTop: "80px" }}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <img
            src={imagePath}
            alt=""
            style={{
              maxWidth: "100%", // responsive width
              height: "auto", // maintain aspect ratio
              objectFit: "cover", // or "cover", depending on use case
            }}
          />
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong
              className={"product-name"}
              style={{ fontFamily: "cursive", fontSize: "25px" }}
            >
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"} style={{ fontFamily: "monospace" }}>
              Kevin Pizza's 🍕
            </span>
            <span className={"resto-name"} style={{ fontFamily: "monospace" }}>
              010 80940023
            </span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: "cursive",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Product Ingredients
              </span>
              <p>
                {chosenProduct?.productIngredients
                  ? chosenProduct?.productIngredients
                  : "No Ingredients!"}
              </p>

              <div
                style={{ display: "flex", gap: "5px" }}
                onClick={() => handleLikeToggle(chosenProduct!._id)}
              >
                <span style={{ fontWeight: 600 }}>LIKE</span>
                {likes === true ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "red" }} />
                )}
              </div>
            </div>
            <Dividerr height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span style={{ fontFamily: "cursive" }}>Price:</span>
              <span style={{ fontFamily: "revert" }}>
                ${chosenProduct?.productPrice}
              </span>
            </div>
            <div className={"button-box"}>
              {authMember ? (
                <Button
                  variant="contained"
                  onClick={() =>
                    onAdd({
                      _id: chosenProduct!._id,
                      name: chosenProduct!.productName,
                      price: chosenProduct!.productPrice,
                      image: chosenProduct!.productImages,
                      quantity: 1,
                    })
                  }
                >
                  Add To Basket
                </Button>
              ) : null}
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
