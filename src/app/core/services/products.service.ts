import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Product, ProductsQueryParams, PaginatedProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(queryParams?: ProductsQueryParams): Observable<PaginatedProductsResponse> {
    let params: HttpParams = new HttpParams();

    if (queryParams?.page !== undefined) {
      params = params.set('page', queryParams.page.toString());
    }
    if (queryParams?.size !== undefined) {
      params = params.set('size', queryParams.size.toString());
    }
    if (queryParams?.brandName) {
      params = params.set('brandName', queryParams.brandName);
    }
    if (queryParams?.productName) {
      params = params.set('productName', queryParams.productName);
    }

    return this.http.get<PaginatedProductsResponse>(`${this.apiUrl}/products`, { params });
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
}
