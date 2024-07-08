import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  BreadcrumbRouterComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartsComponent } from '../../charts/charts.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [ChartjsComponent,RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, BreadcrumbComponent, BreadcrumbItemComponent, NgClass, BreadcrumbRouterComponent]
})
export class BreadcrumbsComponent implements OnInit {
  public items = <any>[];

  chartPieData: any = {}; // Définir votre structure de données pour le Pie Chart
  quantitySumRequests:[] = [];
  constructor(private dashbordService:DashboardService){}


  ngOnInit(): void {
    this.dashbordService.getSumRendementChaineByChaine().subscribe( (data:any) => { this.quantitySumRequests = data; console.log("m",data) // Préparer les données pour le Pie Chart
this.chartPieData = { labels: this.quantitySumRequests.map((item:any) => `Chaine ${item.idChaineMontage}`), datasets: [ { data: this.quantitySumRequests.map((item:any) => item.quantity), backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'   ], hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF' ] } ] }; }, (error: any) => { console.error('Error fetching data:', error); } ); 
    this.items = [
      { label: 'Home', url: '/', attributes: { title: 'Home' } },
      { label: 'Library', url: '/' },
      { label: 'Data', url: '/dashboard/' },
      { label: 'CoreUI', url: '/' }
    ];

    setTimeout(() => {
      this.items = [
        { label: 'CoreUI', url: '/' },
        { label: 'Data', url: '/dashboard/' },
        { label: 'Library', url: '/' },
        { label: 'Home', url: '/', attributes: { title: 'Home' } }
      ];
    }, 5000);
  }
}
