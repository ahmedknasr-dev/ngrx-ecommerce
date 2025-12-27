import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-cart-header',
  imports: [],
  templateUrl: './cart-header.html',
  styleUrl: './cart-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartHeader {
  continueShoppingClick: OutputEmitterRef<void> = output<void>();

  onContinueShoppingClick(): void {
    this.continueShoppingClick.emit();
  }
}
