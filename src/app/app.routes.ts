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

export const routes: Routes = [

    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component: DashboardAdminComponent },
            { path: 'anonnce', component: AnonnceComponent },
            { path: 'anonnce/add', component: AddAnnonceComponent },
            { path: 'anonnce/edit/1', component: EditAnnonceComponent },
            { path: 'annee-academique', component: AnneeAcademiqueComponent },
        ]
    },
    {
        path: '',
        component: CandidatLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'annonces', component: AnnoncePublicComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'annonces/1', component: ShowAnnonceComponent },
            { path: 'annonces/postuler/1', component: PostulerComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'password-forget', component: PasswordForgetComponent },
            { path: 'password-reset', component: PasswordResetComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
