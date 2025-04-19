import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-customer-statistics',
  templateUrl: './customer-statistics.component.html',
  styleUrls: ['./customer-statistics.component.css']
})
export class CustomerStatisticsComponent implements OnInit {

  totalCustomers: number = 0;
  customersByZipCode: Map<string, number> = new Map();
  customersWithOrders: any[] = [];

  @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef;
  barChart: any;

  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef;
  pieChart: any;

  constructor(private statisticsService: CustomerService) {}

  ngOnInit(): void {
    this.fetchTotalCustomers();
    this.fetchCustomersByZipCode();
    this.fetchCustomersWithOrders();

  }

  fetchTotalCustomers(): void {
    this.statisticsService.getTotalCustomers().subscribe(total => {
      this.totalCustomers = total;
    });
  }

  fetchCustomersByZipCode(): void {
    this.statisticsService.getCustomersByZipCode().subscribe(data => {
      this.customersByZipCode = data;
      this.createPieChart(); // Appel de la fonction après récupération des données
    });
  }

  createPieChart(): void {
    if (this.pieChart) {
      this.pieChart.destroy(); // Détruire l'ancien graphique s'il existe
    }

    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: Object.keys(this.customersByZipCode),
        datasets: [{
          label: 'Clients par Code Postal',
          data: Object.values(this.customersByZipCode),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  fetchCustomersWithOrders(): void {
    this.statisticsService.getCustomersWithOrders().subscribe(data => {
      this.customersWithOrders = data;
      this.createBarChart(); // Appel de la fonction après récupération des données
    });
  }

  createBarChart(): void {
    if (this.barChart) {
      this.barChart.destroy(); // Détruire l'ancien graphique s'il existe
    }

    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.customersWithOrders.map(c => `Client ${c.id}`),
        datasets: [{
          label: 'Nombre de commandes',
          data: this.customersWithOrders.map(c => c.totalOrders),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

}
