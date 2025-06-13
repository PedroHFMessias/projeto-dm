import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NavigationState {
  currentPage: string;
  previousPage: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationStateSubject = new BehaviorSubject<NavigationState>({
    currentPage: '/tabs/tab1',
    previousPage: ''
  });

  public navigationState$ = this.navigationStateSubject.asObservable();

  constructor() {}

  setCurrentPage(page: string, data?: any): void {
    const currentState = this.navigationStateSubject.value;
    this.navigationStateSubject.next({
      currentPage: page,
      previousPage: currentState.currentPage,
      data: data
    });
  }

  getCurrentPage(): string {
    return this.navigationStateSubject.value.currentPage;
  }

  getPreviousPage(): string {
    return this.navigationStateSubject.value.previousPage;
  }

  isOnTabPage(): boolean {
    const currentPage = this.getCurrentPage();
    return currentPage.includes('/tabs/');
  }

  getNavigationData(): any {
    return this.navigationStateSubject.value.data;
  }

  clearNavigationData(): void {
    const currentState = this.navigationStateSubject.value;
    this.navigationStateSubject.next({
      ...currentState,
      data: undefined
    });
  }
}