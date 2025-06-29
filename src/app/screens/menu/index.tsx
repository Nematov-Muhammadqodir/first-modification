import {
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from "@mui/material";
import Divider from "../../components/divider";
import { T } from "../../../lib/types/common";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquery } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductsService from "../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

interface MenuProps {
  cartItems: CartItem[];
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onAdd: (item: CartItem) => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Menu(props: MenuProps) {
  const { onAdd, cartItems, onRemove, onDelete, onDeleteAll } = props;
  const { products } = useSelector(productsRetriever);

  const { setProducts } = actionDispatch(useDispatch());
  const [prodCollection, setProdCollection] = useState<ProductCollection>(
    ProductCollection.PIZZA
  );
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("createdAt");
  const [pagination, setPagination] = useState<number>(1);

  //HANDLERS

  const handleProductCollection = (collection: ProductCollection) => {
    setProdCollection(collection);
  };
  const handleProductSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleOrder = (orderValue: string) => {
    setOrder(orderValue);
  };

  const handleNext = () => {
    setPagination((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPagination((prev) => Math.max(prev - 1, 1)); // prevent going below 1
  };

  //USE EFFECT
  useEffect(() => {
    const productService = new ProductsService();

    productService
      .getProducts({
        page: pagination,
        limit: 3,
        order: order,
        productCollection: prodCollection,
        search: search,
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log("Error, getProducts", err);
      });
  }, [prodCollection, search, order, pagination]);

  return (
    <div style={{ flex: 1 }} className="home-page-full-screen">
      <img
        src="/pizzaImages/11040007.png"
        alt="Pizza Background"
        className="menu-responsive-bg-image"
      />
      <Container maxWidth="md" className="menu-page-content">
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ margin: 2 }}
        >
          <Stack flexDirection={"row"} gap={"10px"}>
            <Button
              variant="contained"
              onClick={() => handleOrder("createdAt")}
            >
              New
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOrder("productPrice")}
            >
              Price
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOrder("productViews")}
            >
              Views
            </Button>
          </Stack>

          <TextField
            id="standard-basic"
            label="Search by name"
            variant="standard"
            onChange={(e) => {
              handleProductSearch(e.target.value);
            }}
          />

          <Stack flexDirection={"row"} gap={"10px"}>
            <Button
              variant="contained"
              onClick={() => handleProductCollection(ProductCollection.PIZZA)}
            >
              Pizza
            </Button>
            <Button
              variant="contained"
              onClick={() => handleProductCollection(ProductCollection.DESSERT)}
            >
              Dessert
            </Button>
            <Button
              variant="contained"
              onClick={() => handleProductCollection(ProductCollection.DRINK)}
            >
              Drink
            </Button>
          </Stack>
        </Stack>
        <Stack gap={"20px"}>
          {products.map((product, index) => {
            const imagePath = `${serverApi}/${product.productImages}`;
            return (
              <div className="menu-item-container" key={index}>
                <div className="img-container" key={index}>
                  <img
                    className="border-image"
                    src="/img/background.png"
                    alt="Border"
                  />
                  <img className="pizza-image" src={imagePath} alt="Pizza" />
                </div>
                <div className="menu-item-info-container">
                  <div className="product-info-container">
                    <h3>{product.productName}</h3>
                    <p>{product.productIngredients}</p>
                  </div>
                  <div className="menu-item-price-container">
                    <div>
                      <p>${product.productPrice}</p>
                      <p>views {product.productViews}</p>
                    </div>

                    <Button
                      variant="contained"
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
                      Add to cart
                    </Button>

                    {/* <div className="price-count-container">
                        <Button variant="contained" onClick={handleDecrease}>
                          -
                        </Button>
                        <p>{count}</p>
                        <Button variant="contained" onClick={handleIncrease}>
                          +
                        </Button>
                        <Button variant="contained" onClick={() => setCount(0)}>
                          DELETE
                        </Button>
                      </div> */}
                  </div>
                  <Divider />
                </div>
              </div>
            );
          })}

          <Stack
            className="pagination-section"
            sx={{
              display: "flex",
              alignItems: "space-between",
              flexDirection: "row",
              justifyContent: "center",
              gap: "700px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handlePrevious()}
              className={products.length < 3 ? "justify-left" : ""}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => handleNext()}
              className={products.length < 3 ? "hidden" : ""}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

// import React from "react";

// const AnimatedBackgroundWithCards = () => {
//   const ballsCount = 17;
//   const scaleFactor = 0.85;
//   const animationDelayStep = 0.3;
//   const swingMultiplier = 3;
//   const verticalDropRatio = -0.1;
//   const animationDuration = "5s";
//   const meridiansCount = 17;
//   const viewBoxSize = 100;
//   const centerCoord = viewBoxSize / 2;
//   const circleApproximationConstant = (4 * (Math.sqrt(2) - 1)) / 3;
//   const baseRadius = centerCoord * scaleFactor;

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
//         background: "#fd1",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <svg
//         viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         {Array.from({ length: ballsCount }, (_, i) => {
//           const radius = baseRadius * Math.pow(scaleFactor, i);
//           const cy = centerCoord + baseRadius - radius - i;
//           const animationDelay = i * animationDelayStep;
//           const swingAmount = (-ballsCount + i) * swingMultiplier;
//           const verticalDrop = swingAmount * verticalDropRatio - i;

//           return (
//             <g key={i} opacity="0">
//               <animate
//                 attributeName="opacity"
//                 values="0;1"
//                 dur="0.2s"
//                 begin={`${animationDelay}s`}
//                 fill="freeze"
//               />
//               <animateTransform
//                 attributeName="transform"
//                 type="translate"
//                 values={`${-swingAmount} ${verticalDrop}; 0 0; ${swingAmount} ${verticalDrop}; 0 0; ${-swingAmount} ${verticalDrop}`}
//                 dur={animationDuration}
//                 begin={`${animationDelay}s`}
//                 repeatCount="indefinite"
//               />
//               <animateTransform
//                 attributeName="transform"
//                 type="rotate"
//                 values={`0 ${centerCoord} ${cy}; -180 ${centerCoord} ${cy}; -360 ${centerCoord} ${cy}; -180 ${centerCoord} ${cy}; 0 ${centerCoord} ${cy}`}
//                 dur={animationDuration}
//                 begin={`${animationDelay}s`}
//                 repeatCount="indefinite"
//                 additive="sum"
//               />
//               {Array.from({ length: meridiansCount }, (_, j) => {
//                 const longitude = (j * 360) / meridiansCount;
//                 const maxOffset =
//                   radius * Math.sin((longitude * Math.PI) / 180);
//                 const offsetControl = maxOffset * circleApproximationConstant;
//                 const radiusControl = radius * circleApproximationConstant;
//                 return (
//                   <path
//                     key={j}
//                     d={`M ${centerCoord} ${cy - radius} C ${
//                       centerCoord + offsetControl
//                     } ${cy - radius} ${centerCoord + maxOffset} ${
//                       cy - radiusControl
//                     } ${centerCoord + maxOffset} ${cy} C ${
//                       centerCoord + maxOffset
//                     } ${cy + radiusControl} ${centerCoord + offsetControl} ${
//                       cy + radius
//                     } ${centerCoord} ${cy + radius}`}
//                     stroke="#24a"
//                     strokeWidth="0.1"
//                     fill="none"
//                   />
//                 );
//               })}
//             </g>
//           );
//         })}
//       </svg>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "20px",
//           zIndex: 1,
//         }}
//       >
//         {["🍕", "🍔", "🍣"].map((emoji, index) => (
//           <div
//             key={index}
//             style={{
//               background: "white",
//               borderRadius: "20px",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//               padding: "30px",
//               textAlign: "center",
//               fontSize: "40px",
//             }}
//           >
//             <div>{emoji}</div>
//             <div
//               style={{
//                 marginTop: "10px",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//               }}
//             >
//               Product {index + 1}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnimatedBackgroundWithCards;
