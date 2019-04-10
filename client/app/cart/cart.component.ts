import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ProductsService } from "app/products.service";
import { LoggerService } from "app/logger.service";
import { BaseComponent } from "app/base/base.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent extends BaseComponent implements OnInit {
  private products: Array<Product> = [];
  private selectedProducts: Map<string, number>;
  public cartTotal: number = 0;
  public cartPromotions: Array<CartPromotion> = [];

  constructor(
    private productsService: ProductsService,
    private logger: LoggerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.selectedProducts = new Map(this.storage.get("products")) || new Map();
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    if (!this.selectedProducts.size) {
      this.logger.log("No products selected in local storage");
      return;
    }

    this.logger.log("Loading products from local storage");

    const ids = Array.from(this.selectedProducts.keys());

    try {
      this.products = await this.productsService.getProducts(ids);
      this.mapProducts();
    } catch (err) {
      this.logger.error(err);
    }
  }

  /**
   * Maps products
   * @returns void
   */
  private mapProducts(): void {
    this.cartTotal = 0;
    this.cartPromotions = [];

    if (!this.products.length) {
      return;
    }

    this.products = this.products.map(product => {
      if (this.selectedProducts.has(product._id)) {
        const qty = this.selectedProducts.get(product._id);

        // Updating product quantity and subtotal
        product.qty = qty;
        product.subtotal = qty * product.price;

        // Attaching the promotions to the product
        this.attachPromotion(product);

        // Updating the cart total
        this.cartTotal += product.subtotal;
      }

      return product;
    });
  }

  /**
   * Updates the cart products amount
   * @param id
   * @param name
   */
  public update(id: string, name: string): void {
    const qtyElement = <HTMLInputElement>document.getElementById(`qty-${id}`);
    const qty = parseInt(qtyElement.value, 10);

    if (qty > 0) {
      this.hideAlert();

      this.selectedProducts.set(id, qty);
      this.updateStorage();
      this.mapProducts();
    } else {
      this.showErrorAlert(
        `Please, enter the amount of ${name} you want to update.`
      );
    }
  }

  /**
   * Attaches promotions
   * @param product
   * @returns promotion
   */
  public attachPromotion(product: Product): void {
    if (!product.promotion) {
      return;
    }

    const promotion: Promotion = product.promotion;
    let hasPromotion = false,
      newPrice: number,
      cartPromotion: CartPromotion = {
        description: "",
        original: 0,
        new: 0
      };

    hasPromotion = this.hasPromotion(product, promotion);

    product.hasPromotion = hasPromotion;

    if (!hasPromotion) {
      return;
    }

    switch (promotion.promotionType.name) {
      case "product":
        const descriptions: Array<string> = [];
        promotion.value.forEach(promoProduct => {
          const totalValue = (promoProduct.price * product.qty) / 100;

          const description = `Get one ${
            promoProduct.name
          } completely FREE with the purchase of ${promotion.amount} ${
            product.name
          } for a total value of $${totalValue}`;

          descriptions.push(description);
        });

        cartPromotion.description = descriptions.join("<br>");

        break;

      case "discount":
        // Saving original price
        cartPromotion.original = product.subtotal;

        // Calculating new price
        newPrice =
          product.subtotal - (product.subtotal * promotion.value) / 100;

        // Assigning new price
        product.subtotal = newPrice;

        cartPromotion.new = newPrice;
        cartPromotion.description = `Buy more than ${
          promotion.amount
        } and get ${promotion.value}% discount on all ${product.name}!`;

        break;

      case "price":
        cartPromotion.original = product.subtotal;

        const amount = Math.floor(product.qty / promotion.amount);

        newPrice = product.price * (product.qty - amount);
        product.subtotal = newPrice;

        cartPromotion.new = newPrice;

        cartPromotion.description = `Buy ${promotion.amount} ${product.name} ${
          product.name
        } for the price of ${promotion.value}!`;
        break;
    }

    this.cartPromotions.push(cartPromotion);
  }

  /**
   * Determines whether has a valid promotion
   * @param productQty
   * @param promotionAmount
   * @returns true if promotion
   */
  private hasPromotion(product: Product, promotion: Promotion): boolean {
    let hasPromotion = false;

    if (promotion.comparison === "eq") {
      hasPromotion = product.qty === promotion.amount;
    } else if (promotion.comparison === "gt") {
      hasPromotion = product.qty > promotion.amount;
    } else if (promotion.comparison === "gte") {
      hasPromotion = product.qty >= promotion.amount;
    } else if (promotion.comparison === "lt") {
      hasPromotion = product.qty < promotion.amount;
    }

    return hasPromotion;
  }

  /**
   * Removes cart product
   * @param id
   */
  public remove(id: string, i: number): void {
    if (this.selectedProducts.has(id)) {
      this.selectedProducts.delete(id);
      this.updateStorage();
    }

    this.products.splice(i, 1);
    this.mapProducts();

    this.showSuccessAlert("Product removed successfully!");
  }

  /**
   * Updates storage
   */
  private updateStorage(): void {
    const selectedArray = Array.from(this.selectedProducts);
    this.storage.set("products", selectedArray);
  }
}
