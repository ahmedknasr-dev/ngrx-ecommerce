import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductsFacade } from '../../store/products/products.facade';
import { CartFacade } from '../../store/cart/cart.facade';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart-item.model';
import { ProductDetailsHeader } from './components/product-details-header/product-details-header';
import { ProductInfo } from './components/product-info/product-info';
import { RecommendedCard } from './components/recommended-card/recommended-card';

@Component({
  selector: 'app-products-details',
  imports: [AsyncPipe, ProductDetailsHeader, ProductInfo, RecommendedCard],
  templateUrl: './products-details.html',
  styleUrl: './products-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetails implements OnInit {
  private readonly productsFacade: ProductsFacade = inject(ProductsFacade);
  private readonly cartFacade: CartFacade = inject(CartFacade);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  product$: Observable<Product | null> = this.productsFacade.selectedProduct$;
  loading$: Observable<boolean> = this.productsFacade.loading$;
  cartCount$: Observable<number> = this.cartFacade.totalItems$;

  recommendedProducts$: Observable<Product[]> = this.product$.pipe(
    filter((product: Product | null): product is Product => product !== null),
    map((product: Product) => product.recommendedProducts.slice(0, 4))
  );

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      if (id) {
        this.productsFacade.loadProduct(id);
      }
    });
    this.cartFacade.loadCart();
  }

  onAddToCart(data: { product: Product; quantity: number }): void {
    const cartItem: CartItem = {
      productId: data.product.id,
      productName: data.product.productName,
      price: data.product.price,
      quantity: data.quantity,
      imageUrl: data.product.imageUrl,
      brandName: data.product.brandName,
    };
    this.cartFacade.addToCart(cartItem);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }

  onViewDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  onBackToProducts(): void {
    this.router.navigate(['/products']);
  }
}
