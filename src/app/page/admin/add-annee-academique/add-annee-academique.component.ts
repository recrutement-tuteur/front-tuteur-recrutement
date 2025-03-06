import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnneeAcademiqueService } from '../../../services/annee-academique.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-annee-academique',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-annee-academique.component.html',
  styleUrl: './add-annee-academique.component.css'
})
export class AddAnneeAcademiqueComponent {
    // Signal pour gérer les données du formulaire
    credentials = signal({
        libelle: '',
        dateDebut: '',
        dateFin: ''
    });

    constructor(
      private anneeAcademiqueService: AnneeAcademiqueService,
      private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService 
    ) {}

    ngOnInit  (){
      // Initialisation de credentials avec les données du routeur
      this.credentials.set({
        libelle: '',
        dateDebut: '',
        dateFin: ''
      })
    }

    onSubmit(){
      const anneeData = this.credentials();
      this.anneeAcademiqueService.createAnneeAcademique(anneeData).then(
        (response) => {
          this.toastr.success('Annee academique ajoutée avec succès', 'Succès');
          this.router.navigate(['/admin/annee-academique']);
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout de l\'annee academique', 'Erreur');
        }
      );
    }

}
