import { createAction, props, Action } from '@ngrx/store';
import { CartItem } from '../../core/models/cart-item.model';

export const loadCart: (() => Action<'[Cart] Load Cart'>) & {
  type: '[Cart] Load Cart';
} = createAction('[Cart] Load Cart');

export const loadCartSuccess: ((props: { items: CartItem[] }) => Action<'[Cart] Load Cart Success'> & {
  items: CartItem[];
}) & {
  type: '[Cart] Load Cart Success';
} = createAction('[Cart] Load Cart Success', props<{ items: CartItem[] }>());

export const addToCart: ((props: { item: CartItem }) => Action<'[Cart] Add To Cart'> & { item: CartItem }) & {
  type: '[Cart] Add To Cart';
} = createAction('[Cart] Add To Cart', props<{ item: CartItem }>());

export const addToCartSuccess: ((props: { items: CartItem[] }) => Action<'[Cart] Add To Cart Success'> & {
  items: CartItem[];
}) & {
  type: '[Cart] Add To Cart Success';
} = createAction('[Cart] Add To Cart Success', props<{ items: CartItem[] }>());

export const updateCartItemQuantity: ((props: {
  productId: string;
  quantity: number;
}) => Action<'[Cart] Update Item Quantity'> & { productId: string; quantity: number }) & {
  type: '[Cart] Update Item Quantity';
} = createAction('[Cart] Update Item Quantity', props<{ productId: string; quantity: number }>());

export const updateCartItemQuantitySuccess: ((props: {
  items: CartItem[];
}) => Action<'[Cart] Update Item Quantity Success'> & { items: CartItem[] }) & {
  type: '[Cart] Update Item Quantity Success';
} = createAction('[Cart] Update Item Quantity Success', props<{ items: CartItem[] }>());

export const removeFromCart: ((props: { productId: string }) => Action<'[Cart] Remove From Cart'> & {
  productId: string;
}) & {
  type: '[Cart] Remove From Cart';
} = createAction('[Cart] Remove From Cart', props<{ productId: string }>());

export const removeFromCartSuccess: ((props: { items: CartItem[] }) => Action<'[Cart] Remove From Cart Success'> & {
  items: CartItem[];
}) & {
  type: '[Cart] Remove From Cart Success';
} = createAction('[Cart] Remove From Cart Success', props<{ items: CartItem[] }>());

export const clearCart: (() => Action<'[Cart] Clear Cart'>) & {
  type: '[Cart] Clear Cart';
} = createAction('[Cart] Clear Cart');

export const clearCartSuccess: (() => Action<'[Cart] Clear Cart Success'>) & {
  type: '[Cart] Clear Cart Success';
} = createAction('[Cart] Clear Cart Success');
