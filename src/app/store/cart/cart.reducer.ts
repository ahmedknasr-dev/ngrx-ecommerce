import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState } from './cart.state';
import { CartItem } from '../../core/models/cart-item.model';

export const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals: (items: CartItem[]) => { totalItems: number; totalPrice: number } = (
  items: CartItem[]
): { totalItems: number; totalPrice: number } => {
  const totalItems: number = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const totalPrice: number = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const cartReducer: ActionReducer<CartState> = createReducer(
  initialState,
  on(CartActions.loadCartSuccess, (state: CartState, { items }: { items: CartItem[] }): CartState => {
    const totals: { totalItems: number; totalPrice: number } = calculateTotals(items);
    return {
      ...state,
      items,
      ...totals,
    };
  }),
  on(CartActions.addToCartSuccess, (state: CartState, { items }: { items: CartItem[] }): CartState => {
    const totals: { totalItems: number; totalPrice: number } = calculateTotals(items);
    return {
      ...state,
      items,
      ...totals,
    };
  }),
  on(CartActions.updateCartItemQuantitySuccess, (state: CartState, { items }: { items: CartItem[] }): CartState => {
    const totals: { totalItems: number; totalPrice: number } = calculateTotals(items);
    return {
      ...state,
      items,
      ...totals,
    };
  }),
  on(CartActions.removeFromCartSuccess, (state: CartState, { items }: { items: CartItem[] }): CartState => {
    const totals: { totalItems: number; totalPrice: number } = calculateTotals(items);
    return {
      ...state,
      items,
      ...totals,
    };
  }),
  on(CartActions.clearCartSuccess, (): CartState => initialState)
);
