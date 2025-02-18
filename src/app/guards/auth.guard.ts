import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  // Ton service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Récupérer le rôle requis de la route
    const requiredRole = route.data['role'];

    // Vérifier si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {

      // Vérifier si l'utilisateur a le bon rôle (si nécessaire)
      const userRole = this.authService.getUserRole();

      if (userRole === requiredRole) {
        return true; // L'utilisateur est authentifié et a le bon rôle
      } else {
        // Si l'utilisateur n'a pas le bon rôle
        console.log('Redirection: Rôle incorrect');
        this.router.navigate([`/${requiredRole === 'ADMIN' ? 'admin' : ''}/login`]);
        return false;
      }
    } else {
      // Si l'utilisateur n'est pas authentifié
      console.log('Redirection: Utilisateur non authentifié');
      this.router.navigate([`/${requiredRole === 'ADMIN' ? 'admin' : ''}/login`]);
      return false;
    }
  }
}
