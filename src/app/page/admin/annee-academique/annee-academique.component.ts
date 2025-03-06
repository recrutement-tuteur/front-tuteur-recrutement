import { Component, signal } from '@angular/core';
import { AnneeAcademiqueService } from '../../../services/annee-academique.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-annee-academique',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './annee-academique.component.html',
  styleUrl: './annee-academique.component.css'
})
export class AnneeAcademiqueComponent {

  anneesAcademiques: any[] = [];
  constructor(
    private AnneeAcademiqueService: AnneeAcademiqueService
  ) {}

 

  async getAnneeAcademique() {
    return await this.AnneeAcademiqueService.getAllAnneesAcademiques()
  }

  readonly anneeAcademique = signal<any[]>([])

  async ngOnInit() {
    const data = await this.getAnneeAcademique()

    this.anneeAcademique.set(data)
    
  }

  async onDelete(id: number) {
    try {
      await this.AnneeAcademiqueService.deleteAnneeAcademique(id);
      // Refresh the list after deletion
      const updatedData = await this.getAnneeAcademique();
      this.anneeAcademique.set(updatedData);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }

}
