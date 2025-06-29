import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectMenuPage = (state: AppRootState) => state.menuPage;

export const retrieveProducts = createSelector(
  selectMenuPage,
  (MenuPage) => MenuPage.products
);
