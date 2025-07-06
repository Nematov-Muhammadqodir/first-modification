import { Container, Stack } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { Order } from "../../../lib/types/order";
import { setFinishedOrders, setProcessOrders } from "./slice";
import { createSelector } from "reselect";
import { retrieveFinishedOrders, retrieveProcessOrders } from "./selector";
import { useDispatch } from "react-redux";

const actionDispatch = (dispatch: Dispatch) => ({
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const processOrderRetriever = createSelector(
  retrieveProcessOrders,
  (products) => ({
    products,
  })
);
const finishedOrderRetriever = createSelector(
  retrieveFinishedOrders,
  (products) => ({
    products,
  })
);

export default function OrderInfo() {
  const { setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  return (
    <div
      style={{
        flex: 1,
        marginTop: "156px",
      }}
    >
      <img src="" alt="" />
      <img
        src="/pizzaImages/11039274.png"
        alt="Pizza Background"
        className="responsive-bg-image"
      />
      <Container maxWidth={"sm"} className="order-info-container">
        <Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h3>Order status</h3>
            <div className="prepairing">Prepairing order</div>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h4>Only 51 minutes left 😃</h4>
            <div> Estimated delivery: May 26, 10:38 PM</div>
          </Stack>

          <Stack
            sx={{ fontWeight: "600", letterSpacing: "1px" }}
            flexDirection={"row"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            className="ordered-item-info"
          >
            <Stack>
              <div>
                <span>1x</span>
                <p>Margherita</p>
              </div>
              <p>tomato, mozzarella, prosciutto</p>
            </Stack>
            <p>€15.00</p>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
