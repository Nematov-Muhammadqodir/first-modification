import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquery } from "../../lib/types/product";

class ProductsService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      console.log("Service: getProducts");
      const { page, limit, search, order, productCollection } = input;

      let url = `${this.path}/product/all?order=${order}&page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (productCollection) url += `&productCollection=${productCollection}`;

      const result = await axios.get(url);

      console.log("getProducts", result);
      return result.data;
    } catch (err) {
      console.log("Error getProducts", err);
      throw err;
    }
  }
}
export default ProductsService;
