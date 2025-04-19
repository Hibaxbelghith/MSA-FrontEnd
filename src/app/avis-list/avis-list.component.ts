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
  
 

  constructor(private avisService: CustomerService,
    private alerte : MatSnackBar
  ) {}

  // Dictionnaire de mots avec poids (positifs/négatifs)
  private readonly SENTIMENT_LEXICON: { [word: string]: number } = {
    // Positifs (+1 à +2)
    'super': 2, 'excellent': 2, 'génial': 2, 'parfait': 2, 'recommande': 1,
    'bon': 1, 'qualité': 1, 'satisfait': 1, 'rapide': 1, 'efficace': 1,

    // Négatifs (-1 à -2)
    'mauvais': -2, 'déçu': -2, 'horrible': -2, 'décevant': -2, 'pire': -2,
    'lent': -1, 'cher': -1, 'problème': -1, 'insatisfait': -1, 'éviter': -1
  };

  analyzeSentiment(message: string): { score: number; label: string; emoji: string } {
    const words = message.toLowerCase().split(/\s+/);
    let score = 0;

    // Calcul du score
    words.forEach(word => {
      if (this.SENTIMENT_LEXICON[word]) {
        score += this.SENTIMENT_LEXICON[word];
      }
    });

    // Détection du sentiment
    let label, emoji;
    if (score > 1) {
      label = 'POSITIF';
      emoji = '😊';
    } else if (score < -1) {
      label = 'NÉGATIF';
      emoji = '😠';
    } else {
      label = 'NEUTRE';
      emoji = '😐';
    }

    return { score, label, emoji };
  }

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
