import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'produto/:codigo',
    loadComponent: () => import('./product/product.page').then(m => m.ProductPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'result',
    loadComponent: () => import('./result/result.page').then( m => m.ResultPage)
  }
];