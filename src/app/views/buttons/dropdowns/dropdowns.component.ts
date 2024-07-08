import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  CollapseDirective,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormControlDirective,
  FormDirective,
  NavbarBrandDirective,
  NavbarComponent,
  NavbarNavComponent,
  NavbarTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  RowComponent,
  TextColorDirective,
  ThemeDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ThemeDirective,
    DropdownComponent,
    ButtonDirective,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    NavbarComponent,
    ContainerComponent,
    NavbarBrandDirective,
    NavbarTogglerDirective,
    CollapseDirective,
    NavbarNavComponent,
    NavItemComponent,
    NavLinkDirective,
    ReactiveFormsModule,
    FormDirective,
    FormControlDirective,
    ButtonGroupComponent,
    ChartjsComponent
  ]
})
export class DropdownsComponent implements OnInit{
  chartDataTempsTravailEmploye:any
  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  constructor(private dashbordService:DashboardService) { }
  ngOnInit(): void {
    this.dashbordService.calculateSumTempsTravailParEmploye().subscribe(
      (data: any) => {
        console.log("f",data)
        // Prepare data for line chart
        this.chartDataTempsTravailEmploye = {
          labels: data.map((item:any) => item.idemployer),
          datasets: [
            {
              label: 'Temps total de travail par employé',
              data: data.map((item:any) => item.tempsTravail),
              borderColor: '#4BC0C0',
              fill: false
            }
          ]
        };
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
