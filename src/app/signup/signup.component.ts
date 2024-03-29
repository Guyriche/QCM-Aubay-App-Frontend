import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobaConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  password = true;

  confirmPassword = true;
  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private userservice: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
    ){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      lastName:[null, [Validators.required, Validators.pattern(GlobaConstants.nameRegex)]],
      firstName:[null, [Validators.required, Validators.pattern(GlobaConstants.prenomRegex)]],
      email:[null,[Validators.required, Validators.pattern(GlobaConstants.EmailRegex)]],
      password: [null, [Validators.required]],
      confirmPassword: [null,[Validators.required]]
    })
  }

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data= {
      lastName: formData.lastName,
      firstName: formData.firstName,
      email: formData.email,
      password: formData.password
    }

    this.userservice.signup(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage,"");
        this.router.navigate(['/']);
      },
      error:(error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage = GlobaConstants.genericError;
        }
  
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
