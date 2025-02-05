import { Component, OnInit } from '@angular/core';  // Service pour récupérer les années académiques
import { Router } from '@angular/router';
import { AnnoncesService } from '../../../services/annonces.service';
import { AnneeAcademiqueService } from '../../../services/annee-academique.service';

@Component({
  selector: 'app-add-annonce',
  standalone: true,
  imports: [],
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {
  
  annonce = {
    titre: '',
    description: '',
    anneeAcademique: '',  // ID de l'année académique
    dateDebut: '',
    dateFin: '',
    statut: 'active' // Statut par défaut
  };

  anneesAcademiques = []; // Liste des années académiques

  constructor(
    private annoncesService: AnnoncesService, 
    private anneeAcademiqueService: AnneeAcademiqueService, 
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  // ngOnInit(): void {
  //   // Récupérer les années académiques pour le champ select
  //   this.anneeAcademiqueService.getAllAnneesAcademiques().firstValueFrom(data => {
  //     this.anneesAcademiques = data;
  //   });
  // }

  // // Méthode pour ajouter l'annonce
  // ajouterAnnonce() {
  //   // Appeler le service pour ajouter l'annonce
  //   this.annoncesService.createAnnonce(this.annonce).subscribe(
  //     response => {
  //       console.log('Annonce ajoutée avec succès', response);
  //       // Rediriger l'utilisateur vers la liste des annonces ou vers une page de succès
  //       this.router.navigate(['/annonces']);
  //     },
  //     error => {
  //       console.error('Erreur lors de l\'ajout de l\'annonce', error);
  //     }
  //   );
  // }
}
