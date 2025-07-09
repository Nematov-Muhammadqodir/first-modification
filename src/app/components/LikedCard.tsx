import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import LikeService from "../services/LikeService";
import { createSelector } from "reselect";
import { retrieveLikedProducts } from "../screens/likedProducts/selector";
import { useSelector } from "react-redux";
import { Product } from "../../lib/types/product";
import { serverApi } from "../../lib/config";

interface LikedProductProps {
  product: Product;
}

const likedProductsRetriever = createSelector(
  retrieveLikedProducts,
  (products) => ({
    products,
  })
);

export default function ActionAreaCard(props: LikedProductProps) {
  const history = useHistory();
  const { productName, productIngredients, productImages, _id } = props.product;

  const { products } = useSelector(likedProductsRetriever);

  const imagePath = `${serverApi}/${productImages}`;

  const handleUrlChange = (id: string) => {
    history.push(`menu/${id}`);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#f7f7f7", // light grey background
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        minWidth: 345,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imagePath}
          alt="green iguana"
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(0.95)", // zoom out
            },
            borderBottom: "1px solid #ddd", // subtle separator
          }}
        />
        <CardContent sx={{ height: "200px" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="dance-on-hover"
            sx={{ color: "#333", minHeight: "60px" }}
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
            className="dance-on-hover"
            sx={{ color: "#555", minHeight: "60px" }} // medium grey
          >
            {productIngredients}
          </Typography>
          <Button className="orderBtn" onClick={() => handleUrlChange(_id)}>
            Order
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// menu/685a5cc3d03f9cd080bb3b49
