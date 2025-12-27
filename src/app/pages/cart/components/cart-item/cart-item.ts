import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  computed,
  Signal,
} from '@angular/core';
import { CartItem as CartItemModel } from '../../../../core/models/cart-item.model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItem {
  item: InputSignal<CartItemModel> = input.required<CartItemModel>();
  quantityChange: OutputEmitterRef<{ productId: string; quantity: number }> = output<{
    productId: string;
    quantity: number;
  }>();
  removeClick: OutputEmitterRef<string> = output<string>();

  lineTotal: Signal<number> = computed(() => this.item().price * this.item().quantity);

  onDecreaseQuantity(): void {
    const newQuantity: number = this.item().quantity - 1;
    if (newQuantity > 0) {
      this.quantityChange.emit({ productId: this.item().productId, quantity: newQuantity });
    }
  }

  onIncreaseQuantity(): void {
    const newQuantity: number = this.item().quantity + 1;
    this.quantityChange.emit({ productId: this.item().productId, quantity: newQuantity });
  }

  onRemove(): void {
    this.removeClick.emit(this.item().productId);
  }
}
