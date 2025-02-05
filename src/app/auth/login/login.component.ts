import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Importation de FormsModule pour la gestion des formulaires
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Signal pour gérer les données du formulaire
  readonly credentials = signal({ email: '', password: '' });

  // Variable pour gérer les erreurs d'authentification
  errorMessage = signal('');

  constructor(private authService: UsersService, private router: Router) {}

  // Méthode pour gérer l'envoi du formulaire de connexion
  async onLogin() {
    try {
      // Appel à la méthode de connexion du service d'authentification
      // const response = await this.authService.login(this.credentials()).toPromise();

      const response = await firstValueFrom(this.authService.login(this.credentials()));

      // Si la connexion réussit, rediriger l'utilisateur
      this.router.navigate(['/dashboard']);  // Remplacer par la route souhaitée
    } catch (error) {
      // Gestion de l'erreur en cas de connexion échouée
      this.errorMessage.set('Email ou mot de passe incorrect');
    }
  }
}
