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
    console.log('Form Data Sent:', this.loginForm.value);
    this.customerService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Response from backend:', response);
        localStorage.setItem('authToken', response.token);
        console.log('Token stored:', localStorage.getItem('authToken')); 

        this.router.navigateByUrl('/dashboard/list').then(success => {
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.error('Navigation failed!');
        }
      });
      
    },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error.message || 'Invalid email or password';
      }
    );
  }
  

  
}
