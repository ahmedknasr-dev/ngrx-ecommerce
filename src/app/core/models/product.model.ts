export interface Product {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  imageUrl: string;
  price: number;
  brandName: string;
  recommendedIds: string[];
}

export interface ProductsQueryParams {
  page?: number;
  size?: number;
  brandName?: string;
  productName?: string;
}

export interface PaginatedProductsResponse {
  items: Product[];
  total: number;
  page: number;
  size: number;
}
