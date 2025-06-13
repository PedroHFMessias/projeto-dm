import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { 
  personCircle, 
  person, 
  location, 
  mail, 
  business, 
  home, 
  map, 
  call, 
  create, 
  personAdd 
} from 'ionicons/icons';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
  ]
})
export class Tab2Page implements OnInit, OnDestroy {
  customer: Customer | null = null;
  hasCustomer = false;
  private customerSubscription?: Subscription;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    addIcons({ 
      personCircle, 
      person, 
      location, 
      mail, 
      business, 
      home, 
      map, 
      call, 
      create, 
      personAdd 
    });
  }

  ngOnInit() {
    this.customerSubscription = this.customerService.customer$.subscribe(customer => {
      this.customer = customer;
      this.hasCustomer = customer !== null;
    });
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }

  registerCustomer() {
    this.router.navigate(['/cadastro']);
  }

  editCustomer() {
    this.router.navigate(['/cadastro']);
  }
}