import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, 
    private userServices: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userServices.checkToken().subscribe({
        next: (response:any)=>{
        this.router.navigate(['/aubaytest/dashboard']);
      }, 
      error: (error:any)=>{
        console.log(error);
      }
    })
  }

  handleSignupAction(){
    this.dialog.open(SignupComponent);
  }

  handleLoginAction(){
    this.dialog.open(LoginComponent);
  }

}