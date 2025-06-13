import { Component, EnvironmentInjector, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, person, cart } from 'ionicons/icons';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
})
export class TabsPage implements OnInit, OnDestroy {
  public environmentInjector = inject(EnvironmentInjector);
  cartItemCount = 0;
  private cartSubscription?: Subscription;

  constructor(private productService: ProductService) {
    addIcons({ home, person, cart });
  }

  ngOnInit() {
    this.cartSubscription = this.productService.cart$.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}