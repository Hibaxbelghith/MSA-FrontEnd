import { Component, OnInit } from '@angular/core';
import { ProductRequest, ProductResponse } from '../../product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: ProductResponse | null = null;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    } else {
      this.error = 'Product ID not provided';
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        this.error = 'Failed to load product';
        console.error(err);
      }
    });
  }

  onFormSubmit(productRequest: ProductRequest): void {
    if (this.product) {
      this.productService.updateProduct(this.product.id, productRequest).subscribe({
        next: (updatedProduct) => {
          console.log('Product updated successfully:', updatedProduct);
          this.router.navigate(['/products']); // Or wherever your product list is
        },
        error: (err) => {
          console.error('Update failed', err);
          this.error = 'Failed to update product';
        }
      });
    }
  }
  
}