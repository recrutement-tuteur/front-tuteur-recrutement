import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  private apiUrl = 'https://example.com/api/annonces';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Créer une annonce
  createAnnonce(annonceData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/create`, annonceData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Récupérer toutes les annonces
  getAllAnnonces(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/all`));
  }

  // Récupérer une annonce spécifique
  getAnnonceById(annonceId: number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/details/${annonceId}`));
  }

  // Mettre à jour une annonce
  updateAnnonce(annonceId: number, annonceData: any): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/update/${annonceId}`, annonceData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Supprimer une annonce
  deleteAnnonce(annonceId: number): Promise<any> {
    const token = localStorage.getItem('auth_token');
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/delete/${annonceId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Rechercher des annonces par critères
  searchAnnonces(query: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`));
  }
}
