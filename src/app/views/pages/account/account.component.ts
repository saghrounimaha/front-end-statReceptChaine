import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    standalone: true,
    imports: [ContainerComponent,CommonModule, ReactiveFormsModule,CommonModule,RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class AccountComponent implements OnInit {
  userProfile: any;

 username="ranineline"
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserByUsername( this.username).subscribe(
      (data:any) => {
        this.userProfile = data;
        console.log('User Profile:', data);
      },
      (error:any) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}