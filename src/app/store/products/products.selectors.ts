import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { ProductsState } from './products.state';

export const selectProductsState: MemoizedSelector<object, ProductsState> =
  createFeatureSelector<ProductsState>('products');

export const selectAllProducts: MemoizedSelector<object, Product[]> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectSelectedProduct: MemoizedSelector<object, Product | null> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProduct
);

export const selectProductsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError: MemoizedSelector<object, string | null> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectProductById: (id: string) => MemoizedSelector<object, Product | undefined> = (
  id: string
): MemoizedSelector<object, Product | undefined> =>
  createSelector(selectAllProducts, (products: Product[]) => products.find((product: Product) => product.id === id));

export const selectProductsTotal: MemoizedSelector<object, number> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.total
);

export const selectProductsPage: MemoizedSelector<object, number> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.page
);

export const selectProductsSize: MemoizedSelector<object, number> = createSelector(
  selectProductsState,
  (state: ProductsState) => state.size
);
