import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Badge, Box, Container, Stack } from "@mui/material";
import { Product } from "../../../lib/types/product";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import LikedCard from "../../components/LikedCard";
import ActionAreaCard from "../../components/LikedCard";
import { useEffect } from "react";
import LikeService from "../../services/LikeService";
import { Dispatch } from "@reduxjs/toolkit";
import { setLikedProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveLikedProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";

const actionDispatch = (dispatch: Dispatch) => ({
  setLikedProducts: (data: Product[]) => dispatch(setLikedProducts(data)),
});
const likedProductsRetriever = createSelector(
  retrieveLikedProducts,
  (products) => ({
    products,
  })
);

export default function LikedMenu() {
  const { setLikedProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(likedProductsRetriever);

  useEffect(() => {
    const likeService = new LikeService();

    likeService
      .getLikedProducts()
      .then((data) => setLikedProducts(data))
      .catch((err) => {
        console.log("Liked Product Error", err);
      });
  }, []);
  return (
    <div
      style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}
    >
      <Stack className="card-main-container">
        <h1>Liked Products</h1>
        <Stack className="card-container" direction="row">
          {products.map((product) => {
            return <ActionAreaCard key={product._id} product={product} />;
          })}
        </Stack>
      </Stack>
    </div>
  );
}
