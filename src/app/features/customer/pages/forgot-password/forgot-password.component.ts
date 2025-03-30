import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private cs:CustomerService, private router: Router) {}

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
  
    const email = this.forgotPasswordForm.value.email;
  
    if (email) {
      this.cs.forgotPassword(email).subscribe(
        response => {
          console.log('Response from backend:', response); 
          alert('Password reset email sent!');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during password reset request:', error);
          alert('Error sending password reset email');
        }
      );
    } else {
      alert('Please enter a valid email');
    }
  }
}
