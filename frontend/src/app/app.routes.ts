import { Routes } from '@angular/router';

import { ShellComponent } from './layout/shell/shell';
import { HomeComponent } from './pages/home/home';
import { SimplePageComponent } from './pages/simple-page/simple-page';
import { AdminLoginComponent } from './pages/admin-login/admin-login';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Accueil' } },
      {
        path: 'information',
        component: SimplePageComponent,
        data: { pageKey: 'information' },
      },
      {
        path: 'contact',
        component: SimplePageComponent,
        data: { pageKey: 'contact' },
      },
      {
        path: 'inscription',
        component: SimplePageComponent,
        data: { pageKey: 'inscription' },
      },
      {
        path: 'emploi',
        component: SimplePageComponent,
        data: { pageKey: 'emploi' },
      },
      {
        path: 'financement',
        component: SimplePageComponent,
        data: { pageKey: 'financement' },
      },
    ],
  },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: '**', redirectTo: '' },
];
