import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductRequest } from '../../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onFormSubmit(productRequest: ProductRequest): void {
    this.productService.createProduct(productRequest).subscribe({
      next: (id) => {
        this.router.navigate(['/products', id]);
      },
      error: (err) => {
        this.error = typeof err === 'string' ? err : 
          'Backend connection failed. Is the Spring Boot server running?';
        console.error('Detailed error:', err);
      }
    });
  }
}