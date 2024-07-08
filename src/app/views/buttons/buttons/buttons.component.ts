import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  standalone: true,
  imports: [RowComponent,ChartjsComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, IconDirective, RouterLink]
})
export class ButtonsComponent implements OnInit {
  basicOptions:any
  chartDataSumRendementParEmploye:any
  listRE:any
  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];


  constructor(private dashbordService:DashboardService){}
  ngOnInit(): void {
    this.dashbordService.calculateSumRendementByEmployer().subscribe(
      (data: any) => {
        this.listRE=data;
        console.log(this.listRE);
        // Convertir l'objet en tableau en extrayant les valeurs
       
        // Traitement des données reçues pour les adapter au format attendu par le graphique à barres
        this.chartDataSumRendementParEmploye = {
          labels: data.map((item: any) => item.employerId),
          datasets: [
            {
              label: 'Rendement par Employe',
              data:data.map((item: any) => item.sumRendement),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        };
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données de performance par famille:', error);
      }
    );  }

}
