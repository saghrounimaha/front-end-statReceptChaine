import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
@Component({
    selector: 'app-accordions',
    templateUrl: './accordions.component.html',
    styleUrls: ['./accordions.component.scss'],
    standalone: true,
    imports: [RowComponent, ChartjsComponent,TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, CardHeaderComponent , ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective]
})
export class AccordionsComponent implements OnInit {
  chartData:any
  items = [1, 2, 3, 4];
  basicOptions: any;

  constructor(private dashbordService:DashboardService,
    private sanitizer: DomSanitizer
  ) { }

ngOnInit(): void {
  this.dashbordService.getPerformanceParFamille().subscribe(
    (data: any) => {
      console.log(data)
        // Traitement des données reçues pour les adapter au format attendu par le graphique à barres
        this.chartData = {
            labels: data.map((item: any) => item.idFamille),
            datasets: [
              {
                label: 'Total Quantité',
                data: data.map((item:any) => item.sumQuantite),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
                

                
            ]
        };
    },
    (error: any) => {
        console.error('Erreur lors de la récupération des données de performance par famille:', error);
    }
);
}





  getAccordionBodyText(value: string|number) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }



}
