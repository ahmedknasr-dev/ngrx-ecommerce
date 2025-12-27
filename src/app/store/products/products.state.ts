import { Product } from '../../core/models/product.model';

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  size: number;
}
