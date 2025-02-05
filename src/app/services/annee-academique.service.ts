import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {

  private apiUrl = 'https://example.com/api/annees-academiques';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Créer une nouvelle année académique
  createAnneeAcademique(anneeData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/create`, anneeData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Récupérer toutes les années académiques
  getAllAnneesAcademiques(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/all`));
  }

  // Récupérer une année académique spécifique
  getAnneeAcademiqueById(anneeId: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/details/${anneeId}`));
  }

  // Mettre à jour une année académique
  updateAnneeAcademique(anneeId: number, anneeData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/update/${anneeId}`, anneeData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Supprimer une année académique
  deleteAnneeAcademique(anneeId: number): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/delete/${anneeId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Rechercher des années académiques par critères
  searchAnneesAcademiques(query: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`));
  }
}
