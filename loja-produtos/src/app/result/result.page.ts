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
import { checkmarkCircle, receipt, car, mail, home } from 'ionicons/icons';
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
    total: 0
  };

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    addIcons({ checkmarkCircle, receipt, car, mail, home });
  }

  ngOnInit() {
    // Recuperar dados da navegação
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.purchaseData = navigation.extras.state as PurchaseData;
    } else {
      // Se não há dados, recuperar do carrinho atual
      const currentCart = this.productService.getCart();
      if (currentCart.length > 0) {
        this.purchaseData = {
          cartItems: [...currentCart],
          subtotal: this.productService.getCartTotal(),
          shipping: 21.54,
          total: this.productService.getCartTotal() + 21.54
        };
      } else {
        // Se não há produtos, redirecionar para home
        this.router.navigate(['/tabs/tab1']);
        return;
      }
    }

    // Limpar o carrinho após mostrar o resultado
    this.productService.clearCart();
  }

  goHome() {
    this.router.navigate(['/tabs/tab1']);
  }
}