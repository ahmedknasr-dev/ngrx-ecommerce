import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-product-details-header',
  imports: [],
  templateUrl: './product-details-header.html',
  styleUrl: './product-details-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsHeader {
  cartCount: InputSignal<number> = input.required<number>();
  cartClick: OutputEmitterRef<void> = output<void>();

  onCartClick(): void {
    this.cartClick.emit();
  }
}
