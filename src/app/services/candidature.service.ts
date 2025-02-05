import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private apiUrl = 'https://example.com/api/candidatures';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Soumettre une candidature
  submitCandidature(candidatureData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/submit`, candidatureData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Récupérer toutes les candidatures
  getAllCandidatures(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/all`));
  }

  // Récupérer les candidatures par annonce
  getCandidaturesByAnnonce(annonceId: number): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/annonce/${annonceId}`));
  }

  // Récupérer une candidature spécifique
  getCandidatureById(candidatureId: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/details/${candidatureId}`));
  }

  // Mettre à jour une candidature
  updateCandidature(candidatureId: number, candidatureData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/update/${candidatureId}`, candidatureData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Supprimer une candidature
  deleteCandidature(candidatureId: number): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/delete/${candidatureId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Accepter ou refuser une candidature (Admin)
  changeCandidatureStatus(candidatureId: number, status: string, motif?: string): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/status/${candidatureId}`, { status, motif }, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Récupérer les candidatures d'un candidat
  getCandidaturesByCandidat(candidatId: number): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/candidat/${candidatId}`));
  }
}
