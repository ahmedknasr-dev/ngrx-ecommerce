import { ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterValues } from './products-filters.model';

@Component({
  selector: 'app-products-filters',
  imports: [FormsModule],
  templateUrl: './products-filters.html',
  styleUrl: './products-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFilters {
  filterApplied: OutputEmitterRef<FilterValues> = output<FilterValues>();
  filterReset: OutputEmitterRef<void> = output<void>();

  productName: WritableSignal<string> = signal('');
  brandName: WritableSignal<string> = signal('');

  onApply(): void {
    this.filterApplied.emit({
      productName: this.productName(),
      brandName: this.brandName(),
    });
  }

  onReset(): void {
    this.productName.set('');
    this.brandName.set('');
    this.filterReset.emit();
  }
}
