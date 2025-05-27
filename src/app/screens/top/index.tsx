import { Route, Switch, useRouteMatch } from "react-router-dom";
import TopUsers from "./TopUsers";
import TopProducts from "./TopProducts";

export default function Top() {
  const products = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${products.path}/users`}>
          <TopUsers />
        </Route>
        <Route path={`${products.path}/products`}>
          <TopProducts />
        </Route>
      </Switch>
    </div>
  );
}
