import { Order } from "./order";
import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  menuPage: MenuPageState;
  ordersPage: OrderPageState;
}

//HOMEPAGE
export interface HomePageState {
  newDishes: Product[];
  popularDishes: Product[];
}

//PRODUCTS PAGE
export interface ProductsPageState {
  products: Product[];
}
export interface MenuPageState {
  products: Product[];
}

//ORDERS PAGE
export interface OrderPageState {
  processOrders: Order[];
  finishedOrders: Order[];
}
