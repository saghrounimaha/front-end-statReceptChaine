import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TextColorDirective, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { DocsLinkComponent } from '@docs-components/public-api';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, FormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { DocsExampleComponent } from '../../../components/docs-example/docs-example.component';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  templateUrl: 'list.component.html',
  providers: [IconSetService],
  standalone: true,
  imports: [

    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent,
    DocsLinkComponent,
    IconDirective,
    RowComponent,
    NgxPaginationModule,
RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle

  ]
})
export class ListCompoent implements OnInit {
 // id = this.activeroute.snapshot.params['id'];
  statlist: any[] = [];
  filteredStatList: any[] = [];
  filterText: string = '';
  page: number = 1;
  pageSize: number = 20;
  statForm!:UntypedFormGroup
  submitted=true



  constructor(private dashbordService: DashboardService,private activeroute:ActivatedRoute,private fb:FormBuilder ) {}

  ngOnInit(): void {
    this.getAll();
    this.statForm=this.fb.group({
      idchaineMontage:["",Validators.required],
      idemploye:["",Validators.required],
      quantite:["",Validators.required],
      totalTpsTravail:["",Validators.required],
      date:["",Validators.required],
      rndmt:["",Validators.required],
      idoperation:["",Validators.required],
      idfamille:["",Validators.required],
      totalTpsPrSence:["",Validators.required],
      tpsUnitaire:["",Validators.required],
      rndmtchaine:["",Validators.required],
      idmachine:["",Validators.required],
     })
  }

  getAll(): void {
    this.dashbordService.getAll().subscribe((res: any) => {
      this.statlist = res;
      console.log(this.statlist);
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.filterText) {
      this.filteredStatList = this.statlist.filter(stat =>
        Object.values(stat).some(val =>
          String(val).toLowerCase().includes(this.filterText.toLowerCase())
        )
      );
    } else {
      this.filteredStatList = this.statlist;
    }
  }

delete(id:number){
Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    this.dashbordService.delete(id).subscribe((res:any)=>{
      console.log(res)
    })
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
}

get f(): { [key: string]: AbstractControl } {
  return this.statForm.controls;
}

openSweetAlert(): void {
  Swal.fire({
    title: 'Enter stat details',
    html: this.generateFormHtml(),
    focusConfirm: false,
    preConfirm: () => {
      const formValues = this.getFormValues();

      // Validate form fields
      if (!this.validateForm(formValues)) {
        Swal.showValidationMessage(`Please fill in all required fields`);
        return false;
      }

      // Send data to the backend
      return new Promise((resolve) => {
        this.dashbordService.create(formValues).subscribe(
          (res: any) => {
            console.log(res);
            resolve(true); // Resolve the promise with success
          },
          (error) => {
            Swal.showValidationMessage(`Request failed: ${error.message}`);
          }
        );
      });
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Success', 'Stat added successfully!', 'success');
    }
  });
}

generateFormHtml(): string {
  return `
    <input id="idchaineMontage" class="swal2-input" placeholder="idchaineMontage">
    <input id="idemploye" class="swal2-input" placeholder="idemploye">
    <input id="quantite" class="swal2-input" placeholder="quantite">
    <input id="totalTpsTravail" class="swal2-input" placeholder="totalTpsTravail">
    <input id="date" class="swal2-input" placeholder="date">
    <input id="rndmt" class="swal2-input" placeholder="rndmt">
    <input id="idoperation" class="swal2-input" placeholder="idoperation">
    <input id="idfamille" class="swal2-input" placeholder="idfamille">
    <input id="totalTpsPrSence" class="swal2-input" placeholder="totalTpsPrSence">
    <input id="tpsUnitaire" class="swal2-input" placeholder="tpsUnitaire">
    <input id="rndmtchaine" class="swal2-input" placeholder="rndmtchaine">
    <input id="idmachine" class="swal2-input" placeholder="idmachine">
  `;
}

getFormValues(): any {
  return {
    idchaineMontage: (document.getElementById('idchaineMontage') as HTMLInputElement).value,
    idemploye: (document.getElementById('idemploye') as HTMLInputElement).value,
    quantite: (document.getElementById('quantite') as HTMLInputElement).value,
    totalTpsTravail: (document.getElementById('totalTpsTravail') as HTMLInputElement).value,
    date: (document.getElementById('date') as HTMLInputElement).value,
    rndmt: (document.getElementById('rndmt') as HTMLInputElement).value,
    idoperation: (document.getElementById('idoperation') as HTMLInputElement).value,
    idfamille: (document.getElementById('idfamille') as HTMLInputElement).value,
    totalTpsPrSence: (document.getElementById('totalTpsPrSence') as HTMLInputElement).value,
    tpsUnitaire: (document.getElementById('tpsUnitaire') as HTMLInputElement).value,
    rndmtchaine: (document.getElementById('rndmtchaine') as HTMLInputElement).value,
    idmachine: (document.getElementById('idmachine') as HTMLInputElement).value
  };
}

validateForm(formValues: any): boolean {
  return Object.values(formValues).every(value => value);
}

trackById(index: number, item: any) {
  console.log(item.id)
  return item.id;
}
}
