import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {

  private apiUrl = 'http://localhost:8080/api';// Remplace par l   URL de ton API
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  // Créer une nouvelle année académique
  createAnneeAcademique(anneeData: any): Promise<any> {
    
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/admin/annees-academiques`, anneeData, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }));
  }

  // Récupérer toutes les années académiques
  getAllAnneesAcademiques(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/admin/annees-academiques`));
  }

  // Récupérer une année académique spécifique
  getAnneeAcademiqueById(anneeId: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/admin/annees-academiques/${anneeId}`));
  }

  // Mettre à jour une année académique
  updateAnneeAcademique(anneeId: number, anneeData: any): Promise<any> {
    
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/admin/annees-academiques/${anneeId}`, anneeData, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }));
  }

  // Supprimer une année académique
  deleteAnneeAcademique(anneeId: number): Promise<any> {
    
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/admin/annees-academiques/${anneeId}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }));
  }

  // Rechercher des années académiques par critères
  searchAnneesAcademiques(query: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`));
  }
}
