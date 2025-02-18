import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  // Stocker l'état de l'authentification dans un BehaviorSubject
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  private apiUrl = 'http://localhost:8080/auth';  // Remplace par l'URL de ton API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer l'utilisateur actuel, basée sur le token
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('authToken') || '{}');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }


  // Obtenir l'état de l'authentification comme un observable
  getAuthStatus() {
    return this.authSubject.asObservable();
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

  // Méthode pour se connecter
  logi(token: string) {
    sessionStorage.setItem('authToken', token);
    this.authSubject.next(true); // Met à jour l'état de l'authentification
  }

  // Méthode pour se déconnecter
  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authRole');
    this.authSubject.next(false); // Met à jour l'état de l'authentification
  }

  // Méthode pour récupérer le rôle de l'utilisateur
  getUserRole(): string {
    const userRole = sessionStorage.getItem('authRole'); // Pas besoin de JSON.parse() ici
    return userRole || '';
  }

}
export interface User {
  email?: string,
  password?: string,
  prenom?: string,
  nom?: string,
  role?: string;
}