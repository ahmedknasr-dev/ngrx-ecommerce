import { Routes } from '@angular/router';
import { authGuard } from './core';
import { Type } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login').then((m: { Login: Type<unknown> }) => m.Login),
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./pages/products/products').then((m: { Products: Type<unknown> }) => m.Products),
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    title: 'Product Details',
    loadComponent: () =>
      import('./pages/products-details/products-details').then(
        (m: { ProductsDetails: Type<unknown> }) => m.ProductsDetails
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    title: 'Shopping Cart',
    loadComponent: () => import('./pages/cart/cart').then((m: { Cart: Type<unknown> }) => m.Cart),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
