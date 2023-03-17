import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageComponent } from 'src/app/material-component/dialog/change-language/change-language.component';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent {

  role:any;
  siteLanguage = 'English';
  languageList = [
    {code:'en', label:'English'},
    {code:'fr', label:'Français'},
  ];

  constructor(private router:Router, 
    private dialog:MatDialog,
    private translate: TranslateService) {
  }

  logout(){
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.data = {
      message:'Logout',
      confirmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((Response)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  changeLanguage(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ChangeLanguageComponent);
  }

  changeSiteLanguage(localCode:string):void{

    const selectedLanguage = this.languageList.find((language)=>{
      language.code === localCode
    })?.label.toString();

    if(selectedLanguage){
      this.siteLanguage = selectedLanguage;
      //this.translate.use(localCode);
    }

    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }

  changePassword(){

    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordComponent);;
  }
}
