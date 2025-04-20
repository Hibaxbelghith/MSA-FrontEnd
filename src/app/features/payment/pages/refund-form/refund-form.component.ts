// refund-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefundService } from '../../services/refund.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';

@Component({
  selector: 'app-refund-form',
  templateUrl: './refund-form.component.html',
  styleUrls: ['./refund-form.component.css']
})
export class RefundFormComponent implements OnInit {
  refundForm: FormGroup;
  isLoading = false;
  payment: Payment | null = null;
  maxAmount = 0;

  constructor(
    private fb: FormBuilder,
    private refundService: RefundService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refundForm = this.fb.group({
      paymentId: ['', Validators.required],
      refundAmount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const paymentId = this.route.snapshot.queryParams['paymentId'] || 
                     this.router.getCurrentNavigation()?.extras.state?.['paymentId'];

    if (paymentId) {
      this.refundForm.patchValue({ paymentId });
      this.loadPaymentDetails(paymentId);
    } else {
      this.snackBar.open('Aucun paiement sélectionné', 'Fermer', { duration: 3000 });
      this.router.navigate(['/payments']);
    }
  }

  loadPaymentDetails(paymentId: number): void {
    this.paymentService.getPaymentById(paymentId).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.maxAmount = payment.amount;
        this.refundForm.get('refundAmount')?.addValidators(Validators.max(this.maxAmount));
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement du paiement', 'Fermer', { duration: 3000 });
        this.router.navigate(['/payments']);
      }
    });
  }

  onSubmit(): void {
    if (this.refundForm.invalid) return;
  
    this.isLoading = true;
    this.refundService.requestRefund(this.refundForm.value).subscribe({
      next: () => {
        this.snackBar.open('Demande de remboursement envoyée', 'Fermer', { duration: 3000 });
        this.router.navigate(['/payments/refunds']);
      },
      error: (error) => {
        this.snackBar.open(`Erreur: ${error.message}`, 'Fermer', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/payments']);
  }
}