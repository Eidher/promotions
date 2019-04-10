import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { LoggerService } from 'app/logger.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { BaseComponent } from 'app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  public products: Array<Product> = [];
  public productAdded: boolean = false;
  private selectedProducts: Map<string, number>;

  constructor(
    private productsService: ProductsService, 
    private logger: LoggerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { 
    super();
  }

  ngOnInit() {
    this.selectedProducts = new Map(this.storage.get('products')) || new Map();
    this.getProducts();
  }

  /**
   * Gets products
   */
  public async getProducts(): Promise<void> {
    try {
      this.products = await this.productsService.getAllProducts();
    } catch (err) {
      this.logger.log(err);
    }
  }

  /**
   * Adds to cart
   * @param id 
   * @param qty 
   */
  public addToCart(id:string, name:string): void {
    const qtyElement = (<HTMLInputElement>document.getElementById(`qty-${id}`));
    let qty = parseInt(qtyElement.value, 10);

    if (qty > 0) {
      
      if (this.selectedProducts.has(id)) {
        qty = this.selectedProducts.get(id) + qty;
      }

      this.selectedProducts.set(id, qty);
      const selectedArray = Array.from(this.selectedProducts)

      // Storing selected products in local storage
      this.storage.set('products', selectedArray);
      qtyElement.value = '';

      this.showSuccessAlert(`Your added ${qty} ${name} to your cart successfully!`);
    } else {
      this.showErrorAlert(`Please, enter the amount of ${name} you want to add your the cart.`);
    }
  }
}
