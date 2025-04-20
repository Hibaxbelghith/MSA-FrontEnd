// payment-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  payment: Payment | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.loadPayment(+id);
    } else {
      console.error('Invalid payment ID:', id);
      this.router.navigate(['/payments']); // Redirige si l'ID est invalide
    }
  }

  loadPayment(id: number): void {
    this.isLoading = true;
    this.paymentService.getPaymentById(id).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement du paiement', 'Fermer', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/payments']);
      }
    });
  }

  verifyPayment(id: number): void {
    this.router.navigate(['/payments', id, 'verify']);
  }

  requestRefund(): void {
    if (this.payment) {
      this.router.navigate(['/payments/refunds/new'], { 
        state: { 
          paymentId: this.payment.id,
          maxAmount: this.payment.amount
        } 
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/payments']);
  }
}