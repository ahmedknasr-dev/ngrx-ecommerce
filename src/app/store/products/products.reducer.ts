import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductsState } from './products.state';
import { Product } from '../../core';

export const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  size: 10,
};

export const productsReducer: ActionReducer<ProductsState> = createReducer(
  initialState,
  on(
    ProductsActions.loadProducts,
    (state: ProductsState): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductsSuccess,
    (
      state: ProductsState,
      { response }: { response: { products: Product[]; total: number; page: number; size: number } }
    ): ProductsState => ({
      ...state,
      products: response.products,
      total: response.total,
      page: response.page,
      size: response.size,
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductsFailure,
    (state: ProductsState, { error }: { error: string }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(
    ProductsActions.loadProduct,
    (state: ProductsState): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductSuccess,
    (state: ProductsState, { product }: { product: Product }): ProductsState => ({
      ...state,
      selectedProduct: product,
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductFailure,
    (state: ProductsState, { error }: { error: string }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
