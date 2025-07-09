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
import { useGlobals } from "../../hooks/useGlobals";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PaidIcon from "@mui/icons-material/Paid";
import { useHistory } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeService from "../../services/LikeService";

interface MenuProps {
  onAdd: (item: CartItem) => void;
  cartItems: CartItem[];
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));
export default function MenuList(props: MenuProps) {
  const { authMember } = useGlobals();
  const { onAdd, cartItems } = props;
  const { products } = useSelector(productsRetriever);

  const { setProducts } = actionDispatch(useDispatch());
  const [prodCollection, setProdCollection] = useState<ProductCollection>(
    ProductCollection.PIZZA
  );
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("createdAt");
  const [pagination, setPagination] = useState<number>(1);
  const history = useHistory();

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

  const chooseDishHandler = (id: string) => {
    history.push(`/menu/${id}`);
  };

  return (
    <div
      style={{
        flex: 1,
        marginTop: "76px",
      }}
      className="home-page-full-screen"
    >
      <img
        src="/pizzaImages/11040007.png"
        alt="Pizza Background"
        className="menu-responsive-bg-image"
      />
      <Container
        maxWidth="md"
        className="menu-page-content"
        style={{ marginBottom: cartItems.length > 0 ? "67px" : "30px" }}
      >
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
                  <img
                    className="pizza-image"
                    src={imagePath}
                    alt="Pizza"
                    onClick={(e) => {
                      e.stopPropagation();
                      chooseDishHandler(product._id);
                    }}
                  />
                </div>
                <div className="menu-item-info-container">
                  <div className="product-info-container">
                    <h3>{product.productName}</h3>
                    <p>{product.productIngredients}</p>
                  </div>
                  <div className="menu-item-price-container">
                    <div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <PaidIcon />
                        {product.productPrice}
                      </div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <RemoveRedEyeIcon />
                        {product.productViews}
                      </div>
                    </div>

                    {authMember ? (
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
                    ) : null}
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
