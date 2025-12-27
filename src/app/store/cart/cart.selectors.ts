import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CartItem } from '../../core/models/cart-item.model';
import { CartState } from './cart.state';

export const selectCartState: MemoizedSelector<object, CartState> = createFeatureSelector<CartState>('cart');

export const selectCartItems: MemoizedSelector<object, CartItem[]> = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotalItems: MemoizedSelector<object, number> = createSelector(
  selectCartState,
  (state: CartState) => state.totalItems
);

export const selectCartTotalPrice: MemoizedSelector<object, number> = createSelector(
  selectCartState,
  (state: CartState) => state.totalPrice
);

export const selectCartItemByProductId: (productId: string) => MemoizedSelector<object, CartItem | undefined> = (
  productId: string
): MemoizedSelector<object, CartItem | undefined> =>
  createSelector(selectCartItems, (items: CartItem[]) => items.find((item: CartItem) => item.productId === productId));
