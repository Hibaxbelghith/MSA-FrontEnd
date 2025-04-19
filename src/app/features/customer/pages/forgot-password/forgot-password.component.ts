import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private cs:CustomerService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
  
    const email = this.forgotPasswordForm.value.email;
  
    if (email) {
      this.cs.forgotPassword(email).subscribe(
        response => {
          console.log('Response from backend:', response); 
          this.snackBar.open('Password reset email sent!', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during password reset request:', error);
          this.snackBar.open(error.error.message || 'Email already exists.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    } else {
      alert('Please enter a valid email');
    }
  }
}
