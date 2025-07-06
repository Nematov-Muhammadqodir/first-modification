import { Button, Container, Stack } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import {
  Order,
  OrderInquery,
  OrderUpdateInput,
} from "../../../lib/types/order";
import { setFinishedOrders, setProcessOrders } from "./slice";
import { createSelector } from "reselect";
import { retrieveFinishedOrders, retrieveProcessOrders } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";

const actionDispatch = (dispatch: Dispatch) => ({
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const processOrderRetriever = createSelector(
  retrieveProcessOrders,
  (orders) => ({
    orders,
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
  const { orders } = useSelector(processOrderRetriever);
  const history = useHistory();

  useEffect(() => {
    const orderService = new OrderService();
    const orderInquery: OrderInquery = {
      page: 1,
      limit: 20,
      orderStatus: OrderStatus.PAUSE,
    };

    orderService
      .getMyOrders(orderInquery)
      .then((data) => {
        console.log("useEffect data", data);
        return setProcessOrders(data);
      })
      .catch((err) => {
        console.log("Error shu yerda:", err);
        sweetErrorHandling(err);
      });
  }, []);

  const handleOrderStatus = async (input: OrderUpdateInput) => {
    const orderService = new OrderService();
    await orderService.updateOrderStatus(input);
    history.push("/");
    sweetTopSuccessAlert("Your order successfully ordered");
  };

  return (
    <div
      style={{
        flex: 1,
        marginTop: "156px",
      }}
    >
      <img
        src="/pizzaImages/pizza.jpg"
        alt="Pizza Background"
        className="responsive-bg-image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(40%)", // dims the image
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Container maxWidth={"sm"} className="order-info-container">
        <div className="emoji-decorations">
          <span>🍕</span>
          <span>🧀</span>
          <span>🍄</span>
          <span>🌶️</span>
          <span>🍅</span>
          <span>🥓</span>
        </div>
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
            sx={{
              fontWeight: "600",
              letterSpacing: "1px",
              height: "300px",
              overflow: "scroll",
            }}
            flexDirection={"row"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            className="ordered-item-info"
          >
            <Stack>
              {orders.map((order) => {
                return (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Delivery €{order.orderDelivery}</p>
                      <span>Total amount: €{order.orderTotal}</span>
                    </div>
                    <Button
                      onClick={() =>
                        handleOrderStatus({
                          orderId: order._id,
                          orderStatus: OrderStatus.DELETE,
                        })
                      }
                      variant="outlined"
                      sx={{ marginTop: "20px" }}
                    >
                      Finish the order
                    </Button>
                    <p>
                      ---------------------------------------------------------------------------------------------
                    </p>
                  </div>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
