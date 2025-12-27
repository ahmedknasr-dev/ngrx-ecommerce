import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsFacade } from '../../store/products/products.facade';
import { CartFacade } from '../../store/cart/cart.facade';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart-item.model';
import { ProductsHeader } from './components/products-header/products-header';
import { ProductsFilters } from './components/products-filters/products-filters';
import { ProductsCard } from './components/products-card/products-card';
import { Pagination } from './components/pagination/pagination';
import { AsyncPipe } from '@angular/common';
import { FilterValues } from './components/products-filters/products-filters.model';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ProductsHeader, ProductsFilters, ProductsCard, Pagination],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements OnInit {
  private readonly productsFacade: ProductsFacade = inject(ProductsFacade);
  private readonly cartFacade: CartFacade = inject(CartFacade);
  private readonly router: Router = inject(Router);

  private readonly PAGE_SIZE: number = 3;

  products$: Observable<Product[]> = this.productsFacade.products$;
  loading$: Observable<boolean> = this.productsFacade.loading$;
  total$: Observable<number> = this.productsFacade.total$;
  page$: Observable<number> = this.productsFacade.page$;
  size$: Observable<number> = this.productsFacade.size$;
  cartCount$: Observable<number> = this.cartFacade.totalItems$;

  ngOnInit(): void {
    this.productsFacade.loadProducts({ size: this.PAGE_SIZE });
    this.cartFacade.loadCart();
  }

  onFilterApplied(filters: FilterValues): void {
    this.productsFacade.loadProducts({
      page: 1,
      size: this.PAGE_SIZE,
      brandName: filters.brandName || undefined,
      productName: filters.productName || undefined,
    });
  }

  onFilterReset(): void {
    this.productsFacade.loadProducts({ page: 1, size: this.PAGE_SIZE });
  }

  onPageChange(page: number): void {
    this.productsFacade.loadProducts({ page, size: this.PAGE_SIZE });
  }

  onSizeChange(size: number): void {
    this.productsFacade.loadProducts({ page: 1, size });
  }

  onAddToCart(product: Product): void {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.productName,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      brandName: product.brandName,
    };
    this.cartFacade.addToCart(cartItem);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }
}
