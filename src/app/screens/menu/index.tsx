import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenMenu from "./ChosenMenu";
import { CartItem } from "../../../lib/types/search";
import MenuList from "./MenuList";
interface MenuProps {
  onAdd: (item: CartItem) => void;
  cartItems: CartItem[];
}

export default function Menu(props: MenuProps) {
  const products = useRouteMatch();
  const { onAdd, cartItems } = props;
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenMenu onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <MenuList onAdd={onAdd} cartItems={cartItems} />
        </Route>
      </Switch>
    </div>
  );
}
