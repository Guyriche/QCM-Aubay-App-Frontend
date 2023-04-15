import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobaConstants } from '../shared/global-constants';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm:any = FormGroup;
  responseMessage:any;

  tokenPayload:any; 
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
    ){

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required, Validators.pattern(GlobaConstants.EmailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        try{
          this.tokenPayload = jwt_decode(response.token);
        }catch(err){
          localStorage.clear();
          this.router.navigate(['/']);
        }
        if(this.tokenPayload.role == 'admin'){
          this.router.navigate(['/aubaytest/dashboard']).then((nav)=>{
            console.log(nav)
          });
        }else{
          this.router.navigate(['/aubaytest/quiz']).then((nav)=>{
            console.log(nav)
          });
        }
        
      },
      error: (error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }    
    });
  }

  
  handleForgotPasswordAction(){
    this.dialog.open(ForgotPasswordComponent);
    this.dialogRef.close();
  }

}
