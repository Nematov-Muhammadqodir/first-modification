import { Route, Switch, useRouteMatch } from "react-router-dom";
import TopUsers from "./TopUsers";
import TopProducts from "./TopProducts";
import { useEffect } from "react";
import ProductsService from "../../services/ProductService";
import { setPopularDishes } from "../homepage/slice";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

export interface TopProps {
  onAdd: (item: CartItem) => void;
}

export default function Top(props: TopProps) {
  const { onAdd } = props;
  const { setPopularDishes } = actionDispatch(useDispatch());
  const products = useRouteMatch();
  useEffect(() => {
    const productService = new ProductsService();

    productService
      .getProducts({
        page: 1,
        limit: 3,
        order: "productViews",
      })
      .then((data) => setPopularDishes(data))
      .catch((err) => {
        console.log("Error, getProducts", err);
      });
  }, []);
  return (
    <div>
      <Switch>
        <Route path={`${products.path}/users`}>
          <TopUsers />
        </Route>
        <Route path={`${products.path}/products`}>
          <TopProducts onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
