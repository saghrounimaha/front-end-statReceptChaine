import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { DashboardService } from '../../services/dashboard.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent,CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {
  lineChartData:any;
  lineChartLabels:any;
  pieChartData:any;
  pieChartLabels:any;
  chartDataSumRendementParEmploye:any;
  basicData: any;
  basicOptions: any;
  chartData: any;
  data: any;
  options: any;
lineChartOptions:any;
chartDataTempsTravailEmploye:any;
ntType1Data: any;
  rendementType2Data: any;
  rendementType3Data: any;
  chartDataMonth: any;
  rendementType1Data:any;

  chartPieData: any = {}; // Définir votre structure de données pour le Pie Chart
  quantitySumRequests:[] = [];
  chartDataSumRndmtChaine:any;
  listRE:any[]=[];

  chartDataTime:any;

statlist:[]=[]
totalempl:any
totalprod:any
avrgren!:number
page: number = 0;
  size: number = 10;
  sort: string = 'id,asc';
  totalElements: number = 0;

  constructor(private dashbordService:DashboardService){}

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {

    this.dashbordService.getAll().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );

    this.dashbordService.getTotalEmployee().subscribe((res:any)=>{
      this.totalempl=res;
      console.log("all data",res)
})
this.dashbordService.getTotalProduction().subscribe((res:any)=>{
  this.totalprod=res;
  console.log("all data",res)
})
this.dashbordService.getAvgRendement().subscribe((res:any)=>{
  this.avrgren=res;
  console.log("all data",res)
})

    //get KPI
    const blue500 = '#007BFF';
    const yellow500 = '#FFC107';
    const green500 = '#28A745';
    const blue400 = '#0056B3';
    const yellow400 = '#FF8F00';
    const green400 = '#1E7E34';
    this.dashbordService.getKpi().subscribe((kpiData: any) => {
        this.data = {
            labels: ['Total Production', 'Average Rendement', 'Total Active Employees'],
            datasets: [
                {
                    data: [kpiData.totalProduction, kpiData.averageRendement, kpiData.totalActiveEmployees],
                    backgroundColor: [blue500, yellow500, green500],
                    hoverBackgroundColor: [blue400, yellow400, green400]
                }
            ]
        };
        this.options = {
            cutout: '40%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    });
    //get performance par famille
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
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
    );

    

//rendement par employe
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
);




this.dashbordService.getSumRendementChaineByChaine().subscribe( (data:any) => { this.quantitySumRequests = data; console.log("m",data) // Préparer les données pour le Pie Chart
this.chartPieData = { labels: this.quantitySumRequests.map((item:any) => `Chaine ${item.idChaineMontage}`), datasets: [ { data: this.quantitySumRequests.map((item:any) => item.quantity), backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'   ], hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF' ] } ] }; }, (error: any) => { console.error('Error fetching data:', error); } ); 

// this.dashbordService.getcalculateSumRendementChaineByChaine().subscribe(
//   (data: any) => {
//     console.log(data)
//       // Traitement des données reçues pour les adapter au format attendu par le graphique à barres
//       this.chartDataSumRndmtChaine = {
//           labels: data.map((item: any) => item.chaine),
//           datasets: [
//             {
//               label: 'Rendement par chaine',
//               data: data.map((item:any) => item.rendementChaine),
//               backgroundColor: 'rgba(54, 162, 235, 0.5)',
//               borderColor: 'rgba(54, 162, 235, 1)',
//               borderWidth: 1
//             },
              
//           ]
//       };
//   },
//   (error: any) => {
//       console.error('Erreur lors de la récupération des données de Rendement par chaine:', error);
//   }
// );



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

this.dashbordService.getMonthlyRendement().subscribe(
  (data:any) => {
    // Prepare data for line chart
    this.chartDataMonth = {
      labels: data.map((item:any) => item.month), // Assuming date is a field in MonthlyRendementRequest
      datasets: [
        {
          label: 'Rendement mensuel',
          data: data.map((item:any) => item.rendement), // Assuming rendement is a field in MonthlyRendementRequest
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

// Assume these methods exist in your service



this.dashbordService.getMonthlyRendement().subscribe(
  (data: any) => {
    const dailyLabels = [];
    const dailyValues = [];
    const monthlyLabels = [];
    const monthlyValues = [];
    const yearlyLabels = [];
    const yearlyValues = [];

    // Suppose your API returns data structured as { daily: {}, monthly: {}, yearly: {} }
    // Extract and prepare the data for each chart
    if (data.daily) {
      for (const [key, value] of Object.entries(data.daily)) {
        dailyLabels.push(key);
        dailyValues.push(value);
      }
    }

    if (data.monthly) {
      for (const [key, value] of Object.entries(data.monthly)) {
        monthlyLabels.push(key);
        monthlyValues.push(value);
      }
    }

    if (data.yearly) {
      for (const [key, value] of Object.entries(data.yearly)) {
        yearlyLabels.push(key);
        yearlyValues.push(value);
      }
    }

    // Assuming all datasets have the same length and labels, adjust as needed
    const labels = dailyLabels.length > 0 ? dailyLabels : monthlyLabels.length > 0 ? monthlyLabels : yearlyLabels;

    this.chartDataMonth = {
      labels: labels,
      datasets: [
        {
          label: 'Rendement Quotidien',
          data: dailyValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
        {
          label: 'Rendement Mensuel',
          data: monthlyValues,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
        },
        {
          label: 'Rendement Annuel',
          data: yearlyValues,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: false,
        },
      ],
    };

    this.lineChartOptions.scales.x.labels = labels;
  },
  (error: any) => {
    console.error('Error fetching data:', error);
  }
);











this.fetchData('month'); // Default to monthly view

    this.initCharts();
    this.updateChartOnColorModeChange();


  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }

  // Helper function to generate a random color
getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  }



 
  fetchData(timeframe: string): void {
    let dataObservable;
    if (timeframe === 'day') {
      dataObservable = this.dashbordService.getDailyRendement();
    } else if (timeframe === 'month') {
      dataObservable = this.dashbordService.getMonthlyRendement();
    } else {
      dataObservable = this.dashbordService.getYearlyRendement();
    }

    dataObservable.subscribe(
      (data: any) => {
        this.chartDataTime = {
          labels: data.map((item: any) => timeframe === 'day' ? item.day : timeframe === 'month' ? item.month : item.year),
          datasets: [
            {
              label: `Rendement ${timeframe}`,
              data: data.map((item: any) => item.rendement),
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
