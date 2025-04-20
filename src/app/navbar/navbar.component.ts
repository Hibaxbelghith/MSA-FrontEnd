import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../features/customer/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;

  constructor(private customerService: CustomerService, private router: Router) {}


  ngOnInit(): void {
    this.isLoggedIn = this.customerService.isAuthenticated();
  }

  logout() {
    this.customerService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirige vers la page de login
  }

}
