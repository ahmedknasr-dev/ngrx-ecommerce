import { CartItem } from '../../core/models/cart-item.model';

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
