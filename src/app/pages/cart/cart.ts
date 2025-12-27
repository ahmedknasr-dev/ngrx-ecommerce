import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartFacade } from '../../store/cart/cart.facade';
import { CartItem as CartItemModel } from '../../core/models/cart-item.model';
import { CartHeader } from './components/cart-header/cart-header';
import { CartItem } from './components/cart-item/cart-item';
import { CartSummary } from './components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CartHeader, CartItem, CartSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  private readonly cartFacade: CartFacade = inject(CartFacade);
  private readonly router: Router = inject(Router);

  cartItems$: Observable<CartItemModel[]> = this.cartFacade.cartItems$;
  totalItems$: Observable<number> = this.cartFacade.totalItems$;
  totalPrice$: Observable<number> = this.cartFacade.totalPrice$;

  ngOnInit(): void {
    this.cartFacade.loadCart();
  }

  onContinueShopping(): void {
    this.router.navigate(['/products']);
  }

  onQuantityChange(data: { productId: string; quantity: number }): void {
    this.cartFacade.updateItemQuantity(data.productId, data.quantity);
  }

  onRemoveItem(productId: string): void {
    this.cartFacade.removeFromCart(productId);
  }

  onClearCart(): void {
    this.cartFacade.clearCart();
  }

  onProceed(): void {
    // TODO: Implement checkout logic
  }
}
