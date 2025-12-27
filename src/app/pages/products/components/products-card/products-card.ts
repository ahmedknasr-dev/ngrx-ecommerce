import { ChangeDetectionStrategy, Component, input, output, InputSignal, OutputEmitterRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-products-card',
  imports: [CurrencyPipe],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCard {
  product: InputSignal<Product> = input.required<Product>();
  addToCart: OutputEmitterRef<Product> = output<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
