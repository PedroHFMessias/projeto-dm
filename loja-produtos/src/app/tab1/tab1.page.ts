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
  IonBadge 
} from '@ionic/angular/standalone';
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
    IonBadge
  ],
})
export class Tab1Page implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  openProduct(codigo: string) {
    this.router.navigate(['/produto', codigo]);
  }

  getDiscountPercentage(valorNormal: number, valorComDesconto: number): number {
    return Math.round(((valorNormal - valorComDesconto) / valorNormal) * 100);
  }
}