import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { StorageServiceModule } from "angular-webstorage-service";

// Components
import { AppComponent } from "./app.component";
import { ProductsComponent } from "./products/products.component";

// Services
import { ProductsService } from "./products.service";
import { LoggerService } from "./logger.service";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "contact", component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    HomeComponent,
    CheckoutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ProductsService,
    LoggerService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
