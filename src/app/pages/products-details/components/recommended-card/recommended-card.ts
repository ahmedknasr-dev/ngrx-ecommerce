import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-recommended-card',
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './recommended-card.html',
  styleUrl: './recommended-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedCard {
  product: InputSignal<Product> = input.required<Product>();
  viewDetails: OutputEmitterRef<string> = output<string>();

  onViewDetails(): void {
    this.viewDetails.emit(this.product().id);
  }
}
