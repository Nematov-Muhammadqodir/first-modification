import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  Order,
  OrderInquery,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItem: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.price,
          productId: cartItem._id,
        };
      });

      let url = `${this.path}/order/create`;
      const result = await axios.post(url, orderItem, {
        withCredentials: true,
      });

      return result.data;
    } catch (err) {
      console.log("OrderService:create Error", err);
      throw err;
    }
  }

  public async getMyOrders(input: OrderInquery): Promise<Order[]> {
    let url = `${this.path}/order/all`;
    const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
    const result = await axios.get(url + query, { withCredentials: true });
    console.log("result getOrders", result);
    return result.data;
  }

  public async updateOrderStatus(input: OrderUpdateInput): Promise<Order> {
    let url = `${this.path}/order/update`;
    const result = await axios.post(url, input, { withCredentials: true });
    return result.data;
  }
}

export default OrderService;
