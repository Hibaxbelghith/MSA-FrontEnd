import { Component, OnInit } from '@angular/core';
import { NotificationStatsService } from '../features/customer/services/notification-stats.service';
import { NotificationService } from 'src/app/features/customer/services/notification.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-notification-stats',
  templateUrl: './notification-stats.component.html',
  styleUrls: ['./notification-stats.component.css']
})
export class NotificationStatsComponent implements OnInit {
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const data = context.dataset.data as number[];
            const total = data.reduce((acc: number, curr: number) => acc + curr, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56'
      ]
    }]
  };

  public pieChartType: ChartType = 'pie';
  public totalNotifications: number = 0;
  public isLoading: boolean = true;
  public errorMessage: string = '';

  constructor(
    private statsService: NotificationStatsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.statsService.getNotificationStats().subscribe({
      next: (data: { totalNotifications: number, notificationsByType: Record<string, number> }) => {
        this.totalNotifications = data.totalNotifications;
        const labels = Object.keys(data.notificationsByType);
        const values = Object.values(data.notificationsByType);
        
        this.pieChartData = {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: this.getBackgroundColors(labels.length),
            hoverBackgroundColor: this.getHoverColors(labels.length)
          }]
        };
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.errorMessage = 'Failed to load notification statistics';
        this.isLoading = false;
      }
    });
  }

  private getBackgroundColors(count: number): string[] {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors.slice(0, count);
  }

  private getHoverColors(count: number): string[] {
    const colors = ['#E55375', '#2E8FC5', '#E5B84D', '#3AA8A8', '#8855E5'];
    return colors.slice(0, count);
  }

  refreshStats(): void {
    this.loadStats();
  }

  downloadPdf(): void {
    this.notificationService.downloadNotificationsPdf().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notifications.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Failed to download PDF:', err);
        alert('Failed to download PDF');
      }
    });
  }
}
