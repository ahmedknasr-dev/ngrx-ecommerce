import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-details',
  imports: [],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails {}
