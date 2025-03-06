import { Component, OnInit, signal } from '@angular/core';
import { AnneeAcademiqueService } from '../../../services/annee-academique.service';
import { AnnoncesService } from '../../../services/annonces.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-annonce',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {
  // Signal pour gérer les données du formulaire
  credentials = signal({
    titre: '',
    description: '',
    anneeAcademique: '',  // ID de l'année académique
    dateDebut: '',
    dateFin: '',
    statut: 'active' // Statut par défaut
  });

  readonly anneeAcademique = signal<any[]>([]);

  constructor(
    private anneeAcademiqueService: AnneeAcademiqueService,
    private annoncesService: AnnoncesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  async getAnneeAcademique() {
    return await this.anneeAcademiqueService.getAllAnneesAcademiques();
  }

  async ngOnInit() {
    try {
      const data = await this.getAnneeAcademique();
      this.anneeAcademique.set(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des années académiques:', error);
      this.toastr.error('Erreur lors de la récupération des années académiques', 'Erreur');
    }

    // Initialise les credentials
    this.credentials.set({
      titre: '',
      description: '',
      anneeAcademique: '',  // ID de l'année académique
      dateDebut: '',
      dateFin: '',
      statut: 'active' // Statut par défaut
    });
  }

  onSubmit() {
    const annonceData = this.credentials();
    this.annoncesService.createAnnonce(annonceData).then(
      (response) => {
        this.toastr.success('Annonce ajoutée avec succès', 'Succès');
        this.router.navigate(['/admin/annonces']);
      },
      (error) => {
        this.toastr.error('Erreur lors de l\'ajout de l\'annonce', 'Erreur');
      }
    );
  }
}