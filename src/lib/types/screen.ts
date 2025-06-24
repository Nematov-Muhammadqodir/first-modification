import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
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

//ORDERS PAGE
