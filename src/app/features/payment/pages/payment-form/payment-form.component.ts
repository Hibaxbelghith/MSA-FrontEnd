import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentRequest } from '../../models/payment-request';
import { PaymentVerification } from '../../models/payment-verification';
import { PaymentMethod } from '../../models/payment';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  verificationForm!: FormGroup;
  paymentMethods = Object.values(PaymentMethod);
  isVerificationMode = false;
  paymentId: number | null = null;
  isLoading = false;
  
  sentToEmail: string | null = null;
  sentToPhone: string | null = null;
  contactMethod: 'email' | 'sms' | null = null;

  private readonly PHONE_REGEX = /^\+[1-9]\d{1,14}$/;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.initPaymentData();
  }

  private initForms(): void {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required],
      orderId: ['', Validators.required],
      orderReference: ['', Validators.required],
      customer: this.fb.group({
        id: [''],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.pattern(this.PHONE_REGEX)]]
      })
    });

    this.verificationForm = this.fb.group({
      paymentId: ['', Validators.required],
      otpCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  private initPaymentData(): void {
    const paymentId = this.route.snapshot.paramMap.get('id');
    if (paymentId) {
      this.paymentId = +paymentId;
      this.verificationForm.patchValue({ paymentId: this.paymentId });
      this.isVerificationMode = this.router.url.includes('verify');
      
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.contactMethod = navigation.extras.state['contactMethod'];
        this.sentToEmail = navigation.extras.state['sentToEmail'];
        this.sentToPhone = navigation.extras.state['sentToPhone'];
      }
    }
  }

  onSubmitPayment(): void {
    if (this.paymentForm.invalid) return;

    this.isLoading = true;
    const formValue = this.paymentForm.value;
    const paymentRequest: PaymentRequest = {
      ...formValue,
      phoneNumber: formValue.customer.phoneNumber
    };

    this.paymentService.createPayment(paymentRequest).subscribe({
      next: (id) => this.handlePaymentSuccess(id, formValue),
      error: (error) => this.handlePaymentError(error)
    });
  }

  private handlePaymentSuccess(id: number, formValue: any): void {
    const contactInfo = {
      email: formValue.customer.email,
      phoneNumber: formValue.customer.phoneNumber
    };
    
    const otp = this.generateOtp();
    
    this.paymentService.sendOtp(contactInfo, otp).subscribe({
      next: () => this.handleOtpSuccess(id, contactInfo),
      error: (error) => this.handleOtpError(error)
    });
  }

  private handleOtpSuccess(id: number, contactInfo: any): void {
    const state = {
      contactMethod: contactInfo.phoneNumber ? 'sms' : 'email',
      sentToEmail: contactInfo.email,
      sentToPhone: contactInfo.phoneNumber
    };

    this.router.navigate(['/payments', id, 'verify'], { state });
    this.isLoading = false;
  }

  private handleOtpError(error: any): void {
    this.snackBar.open(`Erreur d'envoi OTP: ${error.message}`, 'Fermer', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
    this.isLoading = false;
  }

  private handlePaymentError(error: any): void {
    this.snackBar.open(`Erreur création paiement: ${error.message}`, 'Fermer', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
    this.isLoading = false;
  }

  onSubmitVerification(): void {
    if (this.verificationForm.invalid) return;

    this.isLoading = true;
    const verificationRequest: PaymentVerification = this.verificationForm.value;

    this.paymentService.verifyPayment(verificationRequest).subscribe({
      next: () => this.handleVerificationSuccess(verificationRequest.paymentId),
      error: (error) => this.handleVerificationError(error),
      complete: () => this.isLoading = false
    });
  }

  private handleVerificationSuccess(paymentId: number): void {
    this.snackBar.open('Paiement vérifié avec succès!', 'Fermer', { 
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/payments', paymentId]);
  }

  private handleVerificationError(error: any): void {
    this.snackBar.open(`Erreur vérification: ${error.message}`, 'Fermer', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}