import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';  // Assurez-vous que vous utilisez le service d'authentification correct

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly credentials = signal({ email: '', password: '' });
  errorMessage = signal('');
  role: string = '';
  linkRegister: string = '';
  linkForgetPassword: string = '';
  linkRedirection: string = '';
  // Utilisation d'un signal pour stocker l'état de l'authentification
  readonly isAuthenticated = signal<boolean>(false);  // Initialisation à false par défaut

  constructor(
    private authService: AuthService,  // Le service d'authentification
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.role = params['role'];
    });

    console.log(this.role);
    if (this.role === 'admin') {
      this.linkRegister = 'admin/register';
      this.linkForgetPassword = 'admin/password-forget';
      this.linkRedirection = '/admin/dashboard';
    } else {
      this.linkRegister = 'register';
      this.linkForgetPassword = 'password-forget';
      this.linkRedirection = '/';
    }

    // Vérification de l'état de la session et mise à jour de isAuthenticated
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  async onLogin() {
    try {
      const response = await firstValueFrom(this.authService.login(this.credentials()));

      // Sauvegarde du token dans sessionStorage
      sessionStorage.setItem('authToken', response.token);
      sessionStorage.setItem('authRole', response.role);

      // Mise à jour de isAuthenticated pour refléter l'état de l'utilisateur connecté
      this.isAuthenticated.set(true);

      // Affichage du message de succès
      this.toastr.success('Connexion réussie!', 'Succès');
      
      // Redirection après la connexion réussie
      this.router.navigate([this.linkRedirection]);

    } catch (error: any) {
      // Gestion des erreurs
      if (error.error && error.error.message) {
        this.errorMessage.set(error.error.message);
        this.toastr.error(error.error.message, 'Erreur');
      } else {
        this.errorMessage.set('Email ou mot de passe incorrect');
        this.toastr.error('Email ou mot de passe incorrect', 'Erreur');
      }
    }
  }
}
