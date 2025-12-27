import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductsQueryParams } from '../../core/models/product.model';
import * as ProductsActions from './products.actions';
import * as ProductsSelectors from './products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  private readonly store: Store = inject(Store);

  // Selectors
  products$: Observable<Product[]> = this.store.select(ProductsSelectors.selectAllProducts);
  selectedProduct$: Observable<Product | null> = this.store.select(ProductsSelectors.selectSelectedProduct);
  loading$: Observable<boolean> = this.store.select(ProductsSelectors.selectProductsLoading);
  error$: Observable<string | null> = this.store.select(ProductsSelectors.selectProductsError);
  total$: Observable<number> = this.store.select(ProductsSelectors.selectProductsTotal);
  page$: Observable<number> = this.store.select(ProductsSelectors.selectProductsPage);
  size$: Observable<number> = this.store.select(ProductsSelectors.selectProductsSize);

  // Actions
  loadProducts(queryParams?: ProductsQueryParams): void {
    this.store.dispatch(ProductsActions.loadProducts({ queryParams }));
  }

  loadProduct(id: string): void {
    this.store.dispatch(ProductsActions.loadProduct({ id }));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.store.select(ProductsSelectors.selectProductById(id));
  }
}
