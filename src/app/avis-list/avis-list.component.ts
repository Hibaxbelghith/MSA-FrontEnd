import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../features/customer/services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-avis-list',
  templateUrl: './avis-list.component.html',
  styleUrls: ['./avis-list.component.css']
})
export class AvisListComponent implements OnInit{

  avisList: any[] = [];
  utilisateur: string = ''; // Utilisateur (nom)
  message: string = ''; // Message de l'avis
  rating: number = 0; // Note de l'avis
  errorMessage: string = '';
  sentiment: string = '';
 

  constructor(private avisService: CustomerService,
    private alerte : MatSnackBar
  ) {}

  ngOnInit() {
    this.avisService.getAvis().subscribe(response => {
      console.log('Réponse de l\'API:', response);
      
      if (response && Array.isArray(response)) {
        this.avisList = response;  // Assigner la réponse à la liste des avis
      } else {
        this.avisList = [];
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des avis', error);
    });
  
  }


// Méthode pour soumettre un nouvel avis
addAvis(): void {
  
  const userEmail = localStorage.getItem('userEmail');  // Récupérer l'email de l'utilisateur

  if (!userEmail) {
    console.error('Aucun utilisateur connecté');
    this.alerte.open('Vous devez vous connecter pour ajouter votre avis', 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    return;
  }

  const avis = {
    utilisateurEmail: userEmail,  // Email de l'utilisateur
    message: this.message,        // Message de l'avis
    rating: this.rating           // Note de l'avis
  };

  // Envoi de l'avis au backend
  this.avisService.submitAvis(avis).subscribe(
    (response) => {
      console.log('Avis enregistré:', response);
      this.avisList.push(response);

    },
    (error) => {
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
    }
  );

  

}



}
