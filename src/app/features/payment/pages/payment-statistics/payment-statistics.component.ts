// payment-statistics.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentStatisticsService } from '../../services/payment-statistics.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-payment-statistics',
  templateUrl: './payment-statistics.component.html',
  styleUrls: ['./payment-statistics.component.css']
})
export class PaymentStatisticsComponent implements OnInit {
  // Données statistiques
  totalPayments: number = 0;
  totalAmount: number = 0;
  averageAmount: number = 0;
  paymentsByStatus: { status: string; count: number }[] = [];
  amountByMethod: { method: string; amount: number }[] = [];
  
  // Colonnes pour le tableau détaillé
  detailedColumns: string[] = ['method', 'amount', 'percentage'];

  // Configuration des graphiques
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };
  
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { 
      y: { 
        beginAtZero: true,
        ticks: {
          callback: (value) => '€' + value
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => '€' + context.raw
        }
      }
    }
  };
  
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private statisticsService: PaymentStatisticsService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getTotalPayments().subscribe(total => {
      this.totalPayments = total;
    });

    this.statisticsService.getTotalAmount().subscribe(amount => {
      this.totalAmount = amount;
      this.updateCharts();
    });

    this.statisticsService.getAveragePaymentAmount().subscribe(avg => {
      this.averageAmount = avg;
    });

    this.statisticsService.getPaymentsByStatus().subscribe(data => {
      this.paymentsByStatus = Object.entries(data).map(([status, count]) => ({ status, count }));
      this.updateCharts();
    });

    this.statisticsService.getTotalAmountByPaymentMethod().subscribe(data => {
      this.amountByMethod = Object.entries(data).map(([method, amount]) => ({ method, amount }));
      this.updateCharts();
    });
  }

  updateCharts(): void {
    // Pie Chart
    this.pieChartData = {
      labels: this.paymentsByStatus.map(item => item.status),
      datasets: [{
        data: this.paymentsByStatus.map(item => item.count),
        backgroundColor: [
          '#FFA500', // PENDING - Orange
          '#4CAF50', // CONFIRMED - Green
          '#F44336'  // FAILED - Red
        ]
      }]
    };

    // Bar Chart
    this.barChartData = {
      labels: this.amountByMethod.map(item => item.method),
      datasets: [{
        label: 'Montant (€)',
        data: this.amountByMethod.map(item => item.amount),
        backgroundColor: '#2196F3' // Blue
      }]
    };

    this.chart?.update();
  }
}