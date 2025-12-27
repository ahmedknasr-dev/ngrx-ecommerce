import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { ProductsService } from '../../core/services/products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly productsService: ProductsService = inject(ProductsService);

  loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(
        ({
          queryParams,
        }: {
          queryParams?: { page?: number; size?: number; brandName?: string; productName?: string };
        }) =>
          this.productsService.getAll(queryParams).pipe(
            map((response: { items: Product[]; total: number; page: number; size: number }) =>
              ProductsActions.loadProductsSuccess({ response })
            ),
            catchError((error: Error) => of(ProductsActions.loadProductsFailure({ error: error.message })))
          )
      )
    )
  );

  loadProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      switchMap(({ id }: { id: string }) =>
        this.productsService.getById(id).pipe(
          map((product: Product) => ProductsActions.loadProductSuccess({ product })),
          catchError((error: Error) => of(ProductsActions.loadProductFailure({ error: error.message })))
        )
      )
    )
  );
}
