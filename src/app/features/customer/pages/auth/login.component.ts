import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // for navigation
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    console.log('Form Data Sent:', this.loginForm.value);
  
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    this.customerService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Response from backend:', response);
  
        // Store the token
        localStorage.setItem('authToken', response.token);
        console.log('Token stored:', localStorage.getItem('authToken'));
  
        // Check the user's role and redirect accordingly
        if (response.role === 'ADMIN') {
          this.router.navigateByUrl('/dashboard/list').then(success => {
            console.log(success ? 'Navigation to Admin Dashboard successful!' : 'Navigation failed!');
          });
        } else {
          this.router.navigateByUrl('/home').then(success => {
            console.log(success ? 'Navigation to Home successful!' : 'Navigation failed!');
          });
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error.message || 'Invalid email or password';
      }
    );
  }
  

  
}
