import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-info',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfo {
  product: InputSignal<Product> = input.required<Product>();
  addToCart: OutputEmitterRef<{ product: Product; quantity: number }> = output<{
    product: Product;
    quantity: number;
  }>();

  quantity: WritableSignal<number> = signal(1);

  onDecreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q: number) => q - 1);
    }
  }

  onIncreaseQuantity(): void {
    if (this.quantity() < this.product().quantity) {
      this.quantity.update((q: number) => q + 1);
    }
  }

  onAddToCart(): void {
    this.addToCart.emit({ product: this.product(), quantity: this.quantity() });
    this.quantity.set(1);
  }
}
