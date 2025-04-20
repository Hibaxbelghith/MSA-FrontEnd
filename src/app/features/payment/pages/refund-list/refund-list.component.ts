// refund-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RefundService } from '../../services/refund.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Refund } from '../../models/refund';
import { RefundStatus } from '../../models/refund';

@Component({
  selector: 'app-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.css']
})
export class RefundListComponent implements OnInit {
  refunds: Refund[] = [];
  displayedColumns: string[] = ['id', 'paymentId', 'amount', 'status', 'date', 'actions'];
  isLoading = true;

  constructor(
    private refundService: RefundService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRefunds();
  }

  loadRefunds(): void {
    this.isLoading = true;
    this.refundService.getAllRefunds().subscribe({
      next: (refunds) => {
        this.refunds = refunds;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des remboursements', 'Fermer', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
  getStatusColor(status: RefundStatus): string {
    switch(status) {
      case RefundStatus.APPROVED: return 'primary';
      case RefundStatus.REJECTED: return 'warn';
      default: return '';
    }
  }

  approveRefund(id: number): void {
    this.refundService.approveRefund(id).subscribe({
      next: () => {
        this.snackBar.open('Remboursement approuvé', 'Fermer', { duration: 3000 });
        this.loadRefunds();
      },
      error: (error) => {
        this.snackBar.open(`Erreur: ${error.message}`, 'Fermer', { duration: 5000 });
      }
    });
  }
  
  rejectRefund(id: number): void {
    this.refundService.rejectRefund(id).subscribe({
      next: () => {
        this.snackBar.open('Remboursement rejeté', 'Fermer', { duration: 3000 });
        this.loadRefunds();
      },
      error: (error) => {
        this.snackBar.open(`Erreur: ${error.message}`, 'Fermer', { duration: 5000 });
      }
    });
  }
}