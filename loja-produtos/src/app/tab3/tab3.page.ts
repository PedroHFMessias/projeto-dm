import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardContent, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, card, storefront, receipt } from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader,
    IonCardTitle,
    IonCardContent, 
    IonButton, 
    IonIcon
  ],
})
export class Tab3Page implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  shippingCost = 21.54;
  private cartSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    addIcons({ cartOutline, card, storefront, receipt });
  }

  ngOnInit() {
    this.cartSubscription = this.productService.cart$.subscribe(cart => {
      this.cartItems = cart;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getSubtotal(): number {
    return this.productService.getCartTotal();
  }

  getTotalWithShipping(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  finalizePurchase() {
    // Navegar para a página de resultado com os dados da compra
    this.router.navigate(['/resultado'], {
      state: {
        cartItems: this.cartItems,
        subtotal: this.getSubtotal(),
        shipping: this.shippingCost,
        total: this.getTotalWithShipping()
      }
    });
  }
}