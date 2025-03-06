import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  private apiUrl = 'http://localhost:8080/api/admin/annonces';  // Remplace par l'URL de ton API
  private token = localStorage.getItem('auth_token');


  constructor(private http: HttpClient) {}

  // Créer une annonce
  createAnnonce(annonceData: any): Promise<any> {
    
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}`, annonceData, {
      headers: { 'Authorization': `Bearer ${this.token}` }
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
    
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/update/${annonceId}`, annonceData, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }));
  }

  // Supprimer une annonce
  deleteAnnonce(annonceId: number): Promise<any> {
    
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/delete/${annonceId}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }));
  }

  // Rechercher des annonces par critères
  searchAnnonces(query: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`));
  }
}
