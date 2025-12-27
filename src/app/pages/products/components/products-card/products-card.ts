import { ChangeDetectionStrategy, Component, input, output, InputSignal, OutputEmitterRef } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-products-card',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCard {
  product: InputSignal<Product> = input.required<Product>();
  addToCart: OutputEmitterRef<Product> = output<Product>();
  viewDetails: OutputEmitterRef<string> = output<string>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product().id);
  }
}
