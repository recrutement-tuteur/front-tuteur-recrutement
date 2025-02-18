import { Routes } from '@angular/router';
import { CandidatLayoutComponent } from './layouts/candidat-layout/candidat-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './page/site/home/home.component';
import { AnnoncePublicComponent } from './page/site/annonce-public/annonce-public.component';
import { DashboardAdminComponent } from './page/admin/dashboard-admin/dashboard-admin.component';
import { AnonnceComponent } from './page/admin/anonnce/anonnce.component';
import { AnneeAcademiqueComponent } from './page/admin/annee-academique/annee-academique.component';
import { ContactComponent } from './page/site/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PasswordForgetComponent } from './auth/password-forget/password-forget.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { ShowAnnonceComponent } from './page/site/show-annonce/show-annonce.component';
import { PostulerComponent } from './page/site/postuler/postuler.component';
import { AddAnnonceComponent } from './page/admin/add-annonce/add-annonce.component';
import { EditAnnonceComponent } from './page/admin/edit-annonce/edit-annonce.component';
import { ProfilComponent } from './page/commun/profil/profil.component';
import { UpdateProfilComponent } from './page/commun/update-profil/update-profil.component';
import { UsersComponent } from './page/admin/users/users.component';
import { AddAnneeAcademiqueComponent } from './page/admin/add-annee-academique/add-annee-academique.component';
import { AddUsersComponent } from './page/admin/add-users/add-users.component';
import { MyCandidatureComponent } from './page/site/my-candidature/my-candidature.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: ':role/login', component: LoginComponent },
    { path: ':role/register', component: RegisterComponent },
    { path: ':role/password-forget', component: PasswordForgetComponent },
    { path: ':role/password-reset', component: PasswordResetComponent },

    // Routes Admin - protégées par AuthGuard et RoleGuard
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' },  // On passe 'admin' comme rôle requis pour accéder aux routes suivantes
        children: [
            { path: 'dashboard', component: DashboardAdminComponent },
            { path: 'profil', component: ProfilComponent },
            { path: 'users', component: UsersComponent },
            { path: 'users/add', component: AddUsersComponent },
            { path: 'update-profil', component: UpdateProfilComponent },
            { path: 'annonces', component: AnonnceComponent },
            { path: 'annonces/add', component: AddAnnonceComponent },
            { path: 'annonces/edit/1', component: EditAnnonceComponent },
            { path: 'annee-academique', component: AnneeAcademiqueComponent },
            { path: 'annee-academique/add', component: AddAnneeAcademiqueComponent },
        ]
    },

    {
        path: '',
        component: CandidatLayoutComponent,
        children: [
            { path: '', component: HomeComponent }, {
                path: 'profil',
                component: ProfilComponent,
                canActivate: [AuthGuard],
                data: { role: 'CANDIDAT' }, 
            },
            {
                path: 'update-profil',
                component: UpdateProfilComponent,
                canActivate: [AuthGuard],
                data: { role: 'CANDIDAT' }, 
            },
            {
                path: 'my-candidatures',
                component: MyCandidatureComponent,
                canActivate: [AuthGuard],
                data: { role: 'CANDIDAT' }, 
            },
            {
                path: 'annonces/postuler/1',
                component: PostulerComponent,
                canActivate: [AuthGuard],
                data: { role: 'CANDIDAT' }, 
            },
            { path: 'annonces', component: AnnoncePublicComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'annonces/1', component: ShowAnnonceComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'password-forget', component: PasswordForgetComponent },
            { path: 'password-reset', component: PasswordResetComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
