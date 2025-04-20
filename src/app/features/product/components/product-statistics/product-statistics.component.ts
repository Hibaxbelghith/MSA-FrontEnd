import { Component, OnInit } from '@angular/core';
import { ProductStatistics } from '../../product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-statistics',
  templateUrl: './product-statistics.component.html',
  styleUrls: ['./product-statistics.component.css']
})
export class ProductStatisticsComponent implements OnInit {
  stats: ProductStatistics | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.isLoading = true;
    this.productService.getProductStatistics().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}