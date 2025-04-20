import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products/detail', id]);
  }
  

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Refresh the product list after deletion
          this.loadProducts();
          // Optional: Show success message
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.snackBar.open('Failed to delete product', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }


  
}