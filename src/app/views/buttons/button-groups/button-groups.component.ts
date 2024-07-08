import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonGroupComponent, ButtonDirective, FormCheckLabelDirective, ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-button-groups',
    templateUrl: './button-groups.component.html',
    styleUrls: ['./button-groups.component.scss'],
    standalone: true,
    imports: [RowComponent, ChartjsComponent,ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonGroupComponent, ButtonDirective, RouterLink, ReactiveFormsModule, FormCheckLabelDirective, ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ThemeDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective]
})
export class ButtonGroupsComponent implements OnInit {
  chartDataTempsTravailEmploye:any
  formBuilder?:any
  formCheck1 = this.formBuilder.group({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false

    
  });
  formRadio1 = new UntypedFormGroup({
    radio1: new UntypedFormControl('Radio1')
  });

  constructor(private dashbordService:DashboardService){}

  ngOnInit(): void {
    throw this.dashbordService.calculateSumTempsTravailParEmploye().subscribe(
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

  setCheckBoxValue(controlName: string) {
    const prevValue = this.formCheck1.get(controlName)?.value;
    const value = this.formCheck1.value;
    value[controlName] = !prevValue;
    this.formCheck1.setValue(value);
  }

  setRadioValue(value: string): void {
    this.formRadio1.setValue({ radio1: value });
  }
}
