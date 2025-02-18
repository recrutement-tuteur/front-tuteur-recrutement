import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UsersService {
  private apiUrl = 'http://localhost:8080/auth';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs
  getUsers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(this.apiUrl));
  }

  // Inscription
  register(userData: User): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/register`, userData));
  }

  // // Connexion
  login(credentials: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        // Gestion des erreurs, on peut retourner un observable vide ou une valeur par défaut
        throw error;
      })
    );
  }

  // Récupération mot de passe
  forgotPassword(email: string): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/forgot-password`, { email }));
  }

  // Obtenir les informations de l'utilisateur actuel
  getUser(): Promise<any> {
    const token = sessionStorage.getItem('authToken');
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Mettre à jour les informations de l'utilisateur
  updateUser(userId: number, userData: any): Promise<any> {
    const token = sessionStorage.getItem('authToken');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/update/${userId}`, userData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Modifier le mot de passe
  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    const token = sessionStorage.getItem('authToken');
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/change-password`, {
      oldPassword,
      newPassword
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    }));
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  // Se déconnecter
  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  // Obtenir le rôle de l'utilisateur
  getRole(): string | null {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}


export interface User {
  email?: string,
  password?: string,
  prenom?: string,
  nom?: string,
  role?: string;
}