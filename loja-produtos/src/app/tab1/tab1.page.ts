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
  IonBadge,
  IonIcon,
  IonChip,
  IonLabel,
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { storefront, pricetag, eye } from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
    IonBadge,
    IonIcon,
    IonChip,
    IonLabel,
    IonButton,
    IonSpinner
  ],
})
export class Tab1Page implements OnInit {
  products: Product[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    addIcons({ storefront, pricetag, eye });
  }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.isLoading = true;
    // Simular carregamento assíncrono
    setTimeout(() => {
      this.products = this.productService.getProducts();
      this.isLoading = false;
    }, 500);
  }

  openProduct(codigo: string) {
    this.router.navigate(['/produto', codigo]);
  }

  getDiscountPercentage(valorNormal: number, valorComDesconto: number): number {
    return Math.round(((valorNormal - valorComDesconto) / valorNormal) * 100);
  }

  trackByProductCode(index: number, product: Product): string {
    return product.codigo;
  }
}