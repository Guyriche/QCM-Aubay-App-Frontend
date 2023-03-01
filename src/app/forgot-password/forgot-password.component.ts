import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobaConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls : ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService, 
    private snackBarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(GlobaConstants.EmailRegex)]]
    });
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email
    }
    this.userService.forgotPassword(data).subscribe({
      next: (response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackbar(this.responseMessage,"");
      },
      error: (error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackBarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

}
