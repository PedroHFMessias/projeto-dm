import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton, 
  IonIcon, 
  IonBadge,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, alertCircle } from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge
  ],
})
export class ProductPage implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastController: ToastController
  ) {
    addIcons({ cart, alertCircle });
  }

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.product = this.productService.getProductByCodigo(codigo);
    }
  }

  getDiscountPercentage(): number {
    if (!this.product) return 0;
    return Math.round(((this.product.valorNormal - this.product.valorComDesconto) / this.product.valorNormal) * 100);
  }

  getSavings(): number {
    if (!this.product) return 0;
    return this.product.valorNormal - this.product.valorComDesconto;
  }

  async addToCart() {
    if (this.product) {
      this.productService.addToCart(this.product);
      
      const toast = await this.toastController.create({
        message: 'Produto adicionado ao carrinho!',
        duration: 2000,
        position: 'bottom',
        color: 'success',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      
      await toast.present();
    }
  }
}