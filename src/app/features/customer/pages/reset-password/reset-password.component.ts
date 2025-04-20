import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  resetPasswordForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cs: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];

    // Check if the token is valid
    if (!this.token) {
      alert('Invalid or expired token');
      this.router.navigate(['/login']); // Or handle the error appropriately
    }

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.resetPasswordForm.value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.token && typeof this.token === 'string') {
      this.cs.resetPassword(this.token, newPassword).subscribe(
        response => {
          console.log('Success Response:', response); 
        
          if (response && response.message) {
            this.snackBar.open('Password reset email sent!', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.router.navigate(['/login']);
          } else {
            alert('Unexpected response format');
          }
        }
      );
      
  }}
}
