import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ajoutez l'import de CommonModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],  // Ajoutez CommonModule dans le tableau imports
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  menuActive = false;
  isDropdownOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggleButton = document.querySelector('.menu-toggle');
    
    if (mobileMenu && toggleButton && !mobileMenu.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
      this.menuActive = false;
    }
  }

  // Fermer le dropdown si on clique à l'extérieur
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    if (!event.target) return;
    const dropdownElement = document.querySelector('.relative');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

   // Méthode pour se déconnecter et rediriger vers la page de connexion
   logout() {
    sessionStorage.removeItem('authToken'); // Supprime le token

    // Rediriger vers la page de connexion
    this.router.navigate(['/admin/login']);
  }
}
