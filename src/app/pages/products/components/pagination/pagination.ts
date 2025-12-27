import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  Signal,
  InputSignal,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  private readonly FIRST_PAGE: number = 1;
  private readonly MIN_SIZE: number = 1;
  private readonly MAX_VISIBLE_PAGES: number = 5;
  private readonly PAGES_BEFORE_CURRENT: number = 2;
  private readonly PAGES_AFTER_CURRENT: number = 2;

  currentPage: InputSignal<number> = input.required<number>();
  pageSize: InputSignal<number> = input.required<number>();
  total: InputSignal<number> = input.required<number>();

  pageChange: OutputEmitterRef<number> = output<number>();
  sizeChange: OutputEmitterRef<number> = output<number>();

  totalPages: Signal<number> = computed<number>(() => Math.ceil(this.total() / this.pageSize()));

  pages: Signal<number[]> = computed<number[]>(() => {
    const total: number = this.totalPages();
    const current: number = this.currentPage();
    const pages: number[] = [];

    let start: number = Math.max(this.FIRST_PAGE, current - this.PAGES_BEFORE_CURRENT);
    const end: number = Math.min(total, start + (this.MAX_VISIBLE_PAGES - 1));

    if (end - start < this.MAX_VISIBLE_PAGES - 1) {
      start = Math.max(this.FIRST_PAGE, end - (this.MAX_VISIBLE_PAGES - 1));
    }

    for (let i: number = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  onPageChange(page: number): void {
    if (page >= this.FIRST_PAGE && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onSizeChange(size: number): void {
    if (size >= this.MIN_SIZE && size !== this.pageSize()) {
      this.sizeChange.emit(size);
    }
  }
}
