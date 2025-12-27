import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart-item.model';
import * as CartActions from './cart.actions';
import * as CartSelectors from './cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  private readonly store: Store = inject(Store);

  // Selectors
  cartItems$: Observable<CartItem[]> = this.store.select(CartSelectors.selectCartItems);
  totalItems$: Observable<number> = this.store.select(CartSelectors.selectCartTotalItems);
  totalPrice$: Observable<number> = this.store.select(CartSelectors.selectCartTotalPrice);

  // Actions
  loadCart(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  addToCart(item: CartItem): void {
    this.store.dispatch(CartActions.addToCart({ item }));
  }

  updateItemQuantity(productId: string, quantity: number): void {
    this.store.dispatch(CartActions.updateCartItemQuantity({ productId, quantity }));
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  getCartItemByProductId(productId: string): Observable<CartItem | undefined> {
    return this.store.select(CartSelectors.selectCartItemByProductId(productId));
  }
}
