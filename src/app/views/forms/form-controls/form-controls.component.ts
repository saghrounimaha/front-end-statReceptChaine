import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
    selector: 'app-form-controls',
    templateUrl: './form-controls.component.html',
    styleUrls: ['./form-controls.component.scss'],
    standalone: true,
    imports: [RowComponent,ChartjsComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class FormControlsComponent implements OnInit{
  chartData:any
  basicOptions:any
  public favoriteColor = '#26ab3c';

  constructor(private dashbordService:DashboardService) { }
  ngOnInit(): void {
    this.dashbordService.getPerformanceParFamille().subscribe(
      (data: any) => {
        console.log(data)
          // Traitement des données reçues pour les adapter au format attendu par le graphique à barres
          this.chartData = {
              labels: data.map((item: any) => item.idFamille),
              datasets: [
                
                  {
                      label: 'Performance par Famille',
                      data: data.map((item: any) => item.avgRendement), // Supposons que le nom du champ de performance soit 'performance'
                      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Couleur de remplissage des barres
                      borderColor: 'rgba(54, 162, 235, 1)', // Couleur de bordure des barres
                      borderWidth: 1
                  },

                  
              ]
          };
      },
      (error: any) => {
          console.error('Erreur lors de la récupération des données de performance par famille:', error);
      }
  );  }

}
