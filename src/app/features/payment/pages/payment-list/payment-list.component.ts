import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RefundService } from '../../services/refund.service';
import { RefundRequest } from '../../models/refund-request';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'amount', 'paymentMethod', 'status', 'customer', 'actions'];
  isLoading = true;

  constructor(
    private paymentService: PaymentService,
    private refundService: RefundService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.paymentService.getAllPayments().subscribe({
      next: (payments) => {
        this.payments = payments;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading payments', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  viewDetails(paymentId: number): void {
    if (!paymentId || isNaN(paymentId)) {
      console.error('Invalid payment ID:', paymentId);
      return;
    }
    this.router.navigate(['/payments', paymentId]);
  }

  verifyPayment(paymentId: number): void {
    this.router.navigate(['/payments', paymentId, 'verify']);
  }

  requestRefund(paymentId: number, amount: number): void {
    const refundRequest: RefundRequest = {
      paymentId: paymentId,
      refundAmount: amount
    };

    this.isLoading = true;
    this.refundService.requestRefund(refundRequest).subscribe({
      next: (refundId) => {
        this.snackBar.open(`Refund requested successfully (ID: ${refundId})`, 'Close', { 
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.loadPayments(); // Refresh the list
      },
      error: (error) => {
        this.snackBar.open(`Error requesting refund: ${error.message}`, 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }
  /*
  exportToPDF(paymentId: number): void {
    this.paymentService.exportPaymentToPDF(paymentId).subscribe({
      next: (pdfBlob: Blob) => {
        // Créer un lien temporaire pour télécharger le PDF
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payment_${paymentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Nettoyer
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        this.snackBar.open('PDF exporté avec succès', 'Fermer', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de l\'export PDF', 'Fermer', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        console.error('Export PDF error:', error);
      }
    });
  }*/
 /*
    exportToPDF(paymentId: number): void {
      const snackBarRef = this.snackBar.open('Génération du PDF en cours...', 'Fermer');
      
      this.paymentService.exportPaymentToPDF(paymentId).subscribe({
        next: (pdfBlob: Blob) => {
          snackBarRef.dismiss();
          
          // Vérifier la taille du fichier
          if (pdfBlob.size < 100) {
            this.snackBar.open('Erreur: PDF vide ou corrompu', 'Fermer', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            return;
          }
    
          const blobUrl = URL.createObjectURL(pdfBlob);
          
          // Option 1: Téléchargement direct
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = `paiement_${paymentId}_${new Date().toISOString().slice(0,10)}.pdf`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          // Option 2: Ouvrir dans un nouvel onglet
          // window.open(blobUrl, '_blank');
          
          // Libérer la mémoire après 30s
          setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
          
          this.snackBar.open('PDF généré avec succès', 'Fermer', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          snackBarRef.dismiss();
          this.snackBar.open(`Erreur: ${error.message}`, 'Fermer', { 
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }*/

      exportToPDF(paymentId: number, openInNewTab: boolean = false): void {
        const snackBarRef = this.snackBar.open('Génération du PDF en cours...', 'Annuler', {
          duration: 0 // Durée illimitée
        });
      
        const onAction = snackBarRef.onAction().subscribe(() => {
          this.snackBar.open('Génération annulée', 'Fermer', { duration: 2000 });
        });
      
        this.paymentService.exportPaymentToPDF(paymentId).subscribe({
          next: (pdfBlob: Blob) => {
            onAction.unsubscribe();
            snackBarRef.dismiss();
      
            if (pdfBlob.size < 100) {
              this.snackBar.open('Erreur: PDF vide ou corrompu', 'Fermer', { 
                duration: 5000,
                panelClass: ['error-snackbar']
              });
              return;
            }
      
            const blobUrl = URL.createObjectURL(pdfBlob);
            
            if (openInNewTab) {
              // Ouvrir dans un nouvel onglet
              window.open(blobUrl, '_blank');
            } else {
              // Téléchargement automatique
              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = `paiement_${paymentId}_${new Date().toISOString().slice(0,10)}.pdf`;
              a.click();
            }
      
            this.snackBar.open('PDF généré avec succès', 'Fermer', { 
              duration: 3000,
              panelClass: ['success-snackbar']
            });
      
            // Nettoyage après 1 minute
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
          },
          error: (error) => {
            onAction.unsubscribe();
            snackBarRef.dismiss();
            this.snackBar.open(`Erreur: ${error.message}`, 'Fermer', { 
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    
}