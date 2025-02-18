import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidat-header.component.html',
  styleUrls: ['./candidat-header.component.css']
})
export class CandidatHeaderComponent implements OnInit {
  menuActive = false;
  isDropdownOpen = false;

  readonly isAuthenticated = signal(false);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est authentifié au moment où le composant est initialisé
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Fusionner les deux @HostListener en une seule méthode pour éviter les conflits
  @HostListener('document:click', ['$event'])
  closeMenusOnClickOutside(event: Event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggleButton = document.querySelector('.menu-toggle');
    const dropdownElement = document.querySelector('.relative');

    // Ferme le menu mobile si on clique à l'extérieur
    if (mobileMenu && toggleButton && !mobileMenu.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
      this.menuActive = false;
    }

    // Ferme le dropdown si on clique à l'extérieur
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  // Méthode pour se déconnecter et rediriger vers la page de connexion
  logout() {
    sessionStorage.removeItem('authToken'); // Supprime le token
    this.isAuthenticated.set(false); // Met à jour l'état de l'authentification

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
