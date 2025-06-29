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
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { useEffect } from "react";
import ProductsService from "../../services/ProductService";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface MenuProps {
  count: number;
  setCount: (value: number) => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const menuItems = [1, 2, 3];
export default function Menu(props: MenuProps) {
  const { count, setCount } = props;
  const { setProducts } = actionDispatch(useDispatch());
  //HANDLERS

  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    const productService = new ProductsService();

    productService
      .getProducts({
        page: 1,
        limit: 3,
        order: "createdAt",
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log("Error, getProducts", err);
      });
  }, []);

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
            <Button variant="contained">New</Button>
            <Button variant="contained">Price</Button>
            <Button variant="contained">Views</Button>
          </Stack>

          <TextField
            id="standard-basic"
            label="Search by name"
            variant="standard"
          />

          <Stack flexDirection={"row"} gap={"10px"}>
            <Button variant="contained">Pizza</Button>
            <Button variant="contained">Dessert</Button>
            <Button variant="contained">Drink</Button>
          </Stack>
        </Stack>
        <Stack gap={"20px"}>
          {menuItems.map((item, index) => {
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
                    src="/img/pizza-1.jpg"
                    alt="Pizza"
                  />
                </div>
                <div className="menu-item-info-container">
                  <div className="product-info-container">
                    <h3>Margherita</h3>
                    <p>tomato, mozzarella, basil</p>
                  </div>
                  <div className="menu-item-price-container">
                    <div>
                      <p>$12.00</p>
                      <p>views</p>
                    </div>
                    {count === 0 ? (
                      <Button variant="contained" onClick={handleIncrease}>
                        Add to cart
                      </Button>
                    ) : (
                      <div className="price-count-container">
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
                      </div>
                    )}
                  </div>
                  <Divider />
                </div>
              </div>
            );
          })}

          <Stack
            className="pagination-section"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
