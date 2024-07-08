import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent,ReactiveFormsModule,CommonModule, RowComponent, ColComponent, CardGroupComponent, 
      RouterOutlet, RouterModule,TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup
  submitted = false;

  constructor(private authService:AuthService,private formBuilder:FormBuilder) {

   }

   ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40)
          ]
        ],
        
      },
      
    );
  }

   
    login(){
      this.submitted = true;
      if(this.loginForm.valid){
  
      this.authService.login(this.loginForm.value).subscribe(
        next=>{
          console.log(next)
          window.location.replace("/#/dashboard");
        },
        error=>{
          console.log("error code ")
        }
  
      )
    }
    else this.loginForm.markAllAsTouched
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
  
  
}
