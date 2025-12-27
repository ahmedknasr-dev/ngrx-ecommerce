import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-products-header',
  imports: [],
  templateUrl: './products-header.html',
  styleUrl: './products-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsHeader {
  cartCount: InputSignal<number> = input.required<number>();
  cartClick: OutputEmitterRef<void> = output<void>();

  onCartClick(): void {
    this.cartClick.emit();
  }
}
