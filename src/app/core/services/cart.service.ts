import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly CART_KEY: string = 'shopping_cart';

  getCartItems(): CartItem[] {
    const cartData: string | null = this.localStorageService.getItem(this.CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }

  saveCartItems(items: CartItem[]): void {
    this.localStorageService.setItem(this.CART_KEY, JSON.stringify(items));
  }

  addItem(item: CartItem): CartItem[] {
    const items: CartItem[] = this.getCartItems();
    const existingItemIndex: number = items.findIndex((i: CartItem) => i.productId === item.productId);

    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.saveCartItems(items);
    return items;
  }

  updateItemQuantity(productId: string, quantity: number): CartItem[] {
    const items: CartItem[] = this.getCartItems();
    const itemIndex: number = items.findIndex((i: CartItem) => i.productId === productId);

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
      }
    }

    this.saveCartItems(items);
    return items;
  }

  removeItem(productId: string): CartItem[] {
    const items: CartItem[] = this.getCartItems().filter((i: CartItem) => i.productId !== productId);
    this.saveCartItems(items);
    return items;
  }

  clearCart(): void {
    this.localStorageService.removeItem(this.CART_KEY);
  }
}
