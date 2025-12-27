import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [CurrencyPipe],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummary {
  totalItems: InputSignal<number> = input.required<number>();
  subtotal: InputSignal<number> = input.required<number>();
  clearCartClick: OutputEmitterRef<void> = output<void>();
  proceedClick: OutputEmitterRef<void> = output<void>();

  onClearCart(): void {
    this.clearCartClick.emit();
  }

  onProceed(): void {
    this.proceedClick.emit();
  }
}
