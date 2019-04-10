import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ProductsService {
  constructor(private http: Http) {}

  /**
   * Gets all products
   * @returns all products
   */
  async getAllProducts(): Promise<Product[]> {
    const response = await this.http.get("/api/products").toPromise();
    const products: Array<Product> = response.json();
    console.log("products", products);
    return products;
  }

  /**
   * Gets products by a list of ids
   * @param ids
   * @returns products
   */
  async getProducts(ids: Array<string>): Promise<Product[]> {
    const response = await this.http.post("/api/products", { ids }).toPromise();
    const products: Array<Product> = response.json();
    return products;
  }
}
