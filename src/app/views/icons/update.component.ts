import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TextColorDirective, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { DocsLinkComponent } from '@docs-components/public-api';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, FormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { DocsExampleComponent } from '../../../components/docs-example/docs-example.component';

@Component({
  templateUrl: 'update.component.html',
  providers: [IconSetService],
  standalone: true,
  imports: [
    
    ReactiveFormsModule,
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent,
    DocsLinkComponent,
    IconDirective,
    RowComponent
, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle

  ]
})
export class UpdateComponent implements OnInit {
  id = this.activeroute.snapshot.params['id'];

  statlist:[]=[]
  displayedStatlist: any[] = [];
 submitted=true
 statForm!:UntypedFormGroup
  constructor(private dashbordService:DashboardService,private fb:FormBuilder,private activeroute:ActivatedRoute){}

  ngOnInit(): void {
   //this.getall();
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

  trackByFn(index: number, item: any): any {
    return item.id; // Replace 'id' with the unique identifier of your items
  }
// getall(){
//   this.dashbordService.findAll().subscribe(
//     (res: any) => {
//       this.statlist = res;
//       this.id=res.idstatRecapChaine;
//       this.displayedStatlist = this.statlist.slice(0, 20); // Get the first 20 items
//       console.log('All data:', res);
//     },
//     (error: any) => {
//       console.error('Error fetching data:', error);
//     }
//   );
// }


get f(): { [key: string]: AbstractControl } {
  return this.statForm.controls;
}

update(){
  if(this.statForm.valid){
    console.log(this.statForm.value)
    console.log(this.statForm.valid)
  this.dashbordService.update(this.id,this.statForm.value).subscribe((rest:any)=>{
    console.log(rest)



  })
}


}


onReset(): void {
  this.submitted = false;
  this.statForm.reset();
}
}
