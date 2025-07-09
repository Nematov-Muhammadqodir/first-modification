import axios from "axios";
import { serverApi } from "../../lib/config";
import { LikeInterface } from "../../lib/types/common";
import { Product } from "../../lib/types/product";

class LikeService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async toggleLike(likeRefId: string): Promise<LikeInterface> {
    try {
      let url = `${this.path}/like/toggle`;
      const result = await axios.post(
        url,
        { likeRefId: likeRefId },
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (err) {
      console.log("Error, getMembers", err);
      throw err;
    }
  }

  public async getLikedProducts(): Promise<Product[]> {
    try {
      let url = `${this.path}/like/allProducts`;
      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (err) {
      console.log("Error, getMembers", err);
      throw err;
    }
  }
}
export default LikeService;
