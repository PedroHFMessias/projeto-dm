import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { checkmarkCircle, receipt, car, mail, home, alertCircle } from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

interface PurchaseData {
  cartItems: Product[];
  subtotal: number;
  shipping: number;
  total: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  imports: [
    CommonModule,
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
export class ResultPage implements OnInit {
  purchaseData: PurchaseData = {
    cartItems: [],
    subtotal: 0,
    shipping: 21.54,
    total: 21.54
  };

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    addIcons({ checkmarkCircle, receipt, car, mail, home, alertCircle });
  }

  ngOnInit() {
    // Primeiro, tentar recuperar dados da navegação
    const navigation = this.router.getCurrentNavigation();
    let hasNavigationData = false;
    
    if (navigation?.extras?.state) {
      this.purchaseData = navigation.extras.state as PurchaseData;
      hasNavigationData = true;
    }
    
    // Se não há dados na navegação, tentar usar o carrinho atual
    if (!hasNavigationData) {
      const currentCart = this.productService.getCart();
      
      if (currentCart && currentCart.length > 0) {
        this.purchaseData = {
          cartItems: [...currentCart],
          subtotal: this.productService.getCartTotal(),
          shipping: 21.54,
          total: this.productService.getCartTotal() + 21.54
        };
        hasNavigationData = true;
      }
    }
    
    // Sempre limpar o carrinho, independentemente de ter dados ou não
    this.productService.clearCart();
  }

  goHome() {
    this.router.navigate(['/tabs/tab1']);
  }
}