import { Component, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  role: string = '';
  userRole: string = '';
  linkLogin: string = ''

  // Signal pour gérer les données du formulaire
  readonly credentials = signal({ email: '', password: '', prenom: '', telephone:'', nom: '', role: '' }); // Valeur initiale vide pour 'role'

  constructor(
    private authService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService 
  ) {
    this.route.params.subscribe(params => {
      this.role = params['role'];
    });
  }

  ngOnInit() {
    console.log(this.role);  // Vérification de la valeur du rôle
    if (this.role === 'admin') {
      this.linkLogin = 'admin/login';
      this.userRole = 'ADMIN';
    } else {
      this.userRole = 'CANDIDAT';
      this.linkLogin = 'login';
    }

    // Initialisation de credentials avec le rôle actuel
    this.credentials.set({
      email: '',
      password: '',
      prenom: '',
      telephone:'',
      nom: '',
      role: this.userRole // Assignation de 'userRole' à 'role' dans credentials
    });
  }

  onSubmit() {
    const userData = this.credentials();

    // Appel du service pour enregistrer l'utilisateur
    this.authService.register(userData).then(response => {
      // Gérer la réponse après une inscription réussie
      console.log('Utilisateur inscrit avec succès', response);
      this.toastr.success('Inscription réussie!', 'Succès');  // Affiche un toast de succès
      // Rediriger vers la page de connexion ou autre selon ton cas
      this.router.navigate([this.linkLogin]);
    }).catch(error => {
      // Gérer les erreurs lors de l'inscription
      console.error('Erreur lors de l\'inscription', error);
      this.toastr.error('Erreur lors de l\'inscription.', 'Erreur');  // Affiche un toast d'erreur
    });
  }
}
