import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Analyse par employé'
    },
    children: [
      {
        path: '',
        redirectTo: 'buttons',
        pathMatch: 'full'
      },
      {
        path: 'Rendementparemploye',
        loadComponent: () => import('./buttons/buttons.component').then(m => m.ButtonsComponent),
        data: {
          title: 'Rendement par employé'
        }
      },
      
     
      {
        path: 'Tempsdetravailparemploye',
        loadComponent: () => import('./dropdowns/dropdowns.component').then(m => m.DropdownsComponent),
        data: {
          title: 'Temps de travail par employé'
        }
      },
    ]
  }
];

