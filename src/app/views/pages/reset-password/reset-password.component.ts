import { ChangeDetectorRef, Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, CardGroupComponent } from '@coreui/angular';
import { ForgotPasswordService } from '../../../services/forgot-password.service';
import { SharedService } from '../../../services/shared.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ContainerComponent,ReactiveFormsModule,CommonModule,CardBodyComponent,CardGroupComponent, 
    RouterOutlet, RouterModule,RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
  
})
export class ResetPasswordComponent {
  fieldTextType!: boolean;
  constructor(private reset: ForgotPasswordService, private share: SharedService, private cdr: ChangeDetectorRef) { }
  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
  }
  showEmailForm: boolean = true;
  showVerifyForm: boolean = false;
  showResetForm: boolean = false;
  errMessage: string = "";
  userEmail: string = "";
  tokenText: string = "";
  hideButton: boolean = false;
  showSpinner: boolean = false;
  loading() {
      this.hideButton = true;
      this.showSpinner = true;
  }
  closeLoading() {
      this.hideButton = false;
      this.showSpinner = false;
  }
  hideMessage() {
      setTimeout(() => {
          this.errMessage = '';
      }, 4000);
  }
  EmailForm = new FormGroup({
      email: new FormControl('', Validators.required)
  });
  verifyForm = new FormGroup({
      token: new FormControl('', Validators.required)
  });
  resetForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
  });

  submitEmailForm() {
    this.loading();
    if (this.EmailForm.valid) {
        this.reset.sendToken(this.EmailForm.value.email!).subscribe({
            next: (data) => {
                console.log(data);
                alert("Please check your mail to get the verification code");
                this.showEmailForm = false;
                this.showVerifyForm = true;
                this.userEmail = this.EmailForm.value.email!;
                this.closeLoading();
            },
            error: (err) => {
                this.share.errorMessageObservable.subscribe(value => {
                    this.errMessage = value;
                    this.closeLoading();
                    this.hideMessage();
                });
            },
            complete: () => {
                console.log("Complete!");
                this.closeLoading();
                this.hideMessage();
            }
        })
    } else {
        this.errMessage = "You didn't fill a required field";
    }
}
submitVerifyForm() {
  this.loading();
  if (this.verifyForm.valid) {
      this.reset.verifyToken({ email: this.userEmail, tokenText: this.verifyForm.value.token }).subscribe({
          next: (value) => {
              this.closeLoading();
              console.log(value);
              this.showVerifyForm = false;
              this.showResetForm = true;
              this.tokenText = this.verifyForm.value.token!;
          },
          error: (err) => {
              this.share.errorMessageObservable.subscribe(value => {
                  this.errMessage = value;
                  this.closeLoading();
                  this.hideMessage();
              });
          },
          complete: () => {
              console.log("Complete!");
          }
      });
  } else {
      this.closeLoading();
      this.hideMessage();
      this.errMessage = "You didn't fill a required field";
  }
}
submitResetForm() {
    this.loading();
    if (this.resetForm.valid) {
        this.reset.resetPassword(
            {
                email: this.userEmail,
                tokenText: this.tokenText,
                newPassword: this.resetForm.value.password,
                confirmPassword: this.resetForm.value.confirmPassword
            }).subscribe({
                next: (value) => {
                    console.log(value);
                    window.location.replace("/#/login");
                },
                error: (err) => {
                    this.share.errorMessageObservable.subscribe(value => {
                        this.errMessage = value;
                        this.closeLoading();
                        this.hideMessage();
                    });
                },
                complete: () => {
                    console.log("complete")
                }
            });
    } else {
        this.closeLoading();
        this.hideMessage();
        this.errMessage = "You didn't fill a required field";
    }
}
}
