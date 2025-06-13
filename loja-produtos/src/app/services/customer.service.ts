import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerSubject = new BehaviorSubject<Customer | null>(null);
  public customer$ = this.customerSubject.asObservable();

  constructor() {}

  getCustomer(): Customer | null {
    return this.customerSubject.value;
  }

  hasCustomer(): boolean {
    return this.customerSubject.value !== null;
  }

  saveCustomer(customer: Customer): void {
    // Atualiza o BehaviorSubject
    this.customerSubject.next(customer);
  }

  clearCustomer(): void {
    this.customerSubject.next(null);
  }
}