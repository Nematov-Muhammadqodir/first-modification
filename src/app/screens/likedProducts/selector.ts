import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectLikedProductsPage = (state: AppRootState) =>
  state.likedProductsPage;

export const retrieveLikedProducts = createSelector(
  selectLikedProductsPage,
  (LikedProductPage) => LikedProductPage.products
);
