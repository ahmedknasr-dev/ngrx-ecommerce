import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly cartService: CartService = inject(CartService);

  loadCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() => {
        const items: CartItem[] = this.cartService.getCartItems();
        return of(CartActions.loadCartSuccess({ items }));
      })
    )
  );

  addToCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      map(({ item }: { item: CartItem }) => {
        const items: CartItem[] = this.cartService.addItem(item);
        return CartActions.addToCartSuccess({ items });
      })
    )
  );

  updateCartItemQuantity$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartItemQuantity),
      map(({ productId, quantity }: { productId: string; quantity: number }) => {
        const items: CartItem[] = this.cartService.updateItemQuantity(productId, quantity);
        return CartActions.updateCartItemQuantitySuccess({ items });
      })
    )
  );

  removeFromCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      map(({ productId }: { productId: string }) => {
        const items: CartItem[] = this.cartService.removeItem(productId);
        return CartActions.removeFromCartSuccess({ items });
      })
    )
  );

  clearCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      map(() => {
        this.cartService.clearCart();
        return CartActions.clearCartSuccess();
      })
    )
  );
}
