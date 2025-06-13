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
  IonIcon,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, card, storefront, receipt, cart, bag } from 'ionicons/icons';
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
    IonIcon,
    IonChip,
    IonLabel
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
    addIcons({ cartOutline, card, storefront, receipt, cart, bag });
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
    if (this.cartItems.length === 0) {
      console.log('Carrinho vazio, não é possível finalizar compra');
      return;
    }

    // Preparar dados da compra
    const purchaseData = {
      cartItems: [...this.cartItems],
      subtotal: this.getSubtotal(),
      shipping: this.shippingCost,
      total: this.getTotalWithShipping()
    };

    console.log('Finalizando compra...');
    
    // Navegar para a página de resultado
    this.router.navigate(['/resultado'], {
      state: purchaseData
    }).catch((error) => {
      console.error('Erro na navegação:', error);
      // Fallback: tentar navegar sem dados
      this.router.navigate(['/resultado']);
    });
  }
}