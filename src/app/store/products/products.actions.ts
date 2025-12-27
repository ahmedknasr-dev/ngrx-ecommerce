import { createAction, props, Action } from '@ngrx/store';
import { Product, ProductsQueryParams, PaginatedProductsResponse } from '../../core/models/product.model';

export const loadProducts: ((props: {
  queryParams?: ProductsQueryParams;
}) => Action<'[Products Page] Load Products'> & { queryParams?: ProductsQueryParams }) & {
  type: '[Products Page] Load Products';
} = createAction('[Products Page] Load Products', props<{ queryParams?: ProductsQueryParams }>());

export const loadProductsSuccess: ((props: {
  response: PaginatedProductsResponse;
}) => Action<'[Products API] Load Products Success'> & { response: PaginatedProductsResponse }) & {
  type: '[Products API] Load Products Success';
} = createAction('[Products API] Load Products Success', props<{ response: PaginatedProductsResponse }>());

export const loadProductsFailure: ((props: {
  error: string;
}) => Action<'[Products API] Load Products Failure'> & { error: string }) & {
  type: '[Products API] Load Products Failure';
} = createAction('[Products API] Load Products Failure', props<{ error: string }>());

export const loadProduct: ((props: {
  id: string;
}) => Action<'[Product Details Page] Load Product'> & { id: string }) & {
  type: '[Product Details Page] Load Product';
} = createAction('[Product Details Page] Load Product', props<{ id: string }>());

export const loadProductSuccess: ((props: {
  product: Product;
}) => Action<'[Products API] Load Product Success'> & { product: Product }) & {
  type: '[Products API] Load Product Success';
} = createAction('[Products API] Load Product Success', props<{ product: Product }>());

export const loadProductFailure: ((props: {
  error: string;
}) => Action<'[Products API] Load Product Failure'> & { error: string }) & {
  type: '[Products API] Load Product Failure';
} = createAction('[Products API] Load Product Failure', props<{ error: string }>());
