import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})

export class ThemeComponent implements OnInit {

  onAddTheme = new EventEmitter();
  onEditTheme = new EventEmitter();
  onDeleteTheme = new EventEmitter();
  themeForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  reponseMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private themeService: ThemeService,
  public dialogRef: MatDialogRef<ThemeComponent>,
  private snacbarService: SnackbarService){}

  ngOnInit(): void {
    this.themeForm = this.formBuilder.group({
      wording:[null, [Validators.required]],
      description:[null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update"
      this.themeForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){

    var formData = this.themeForm.value;
    var data = {
      wording: formData.wording,
      description: formData.description
    }

    this.themeService.add(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onAddTheme.emit();
        this.reponseMessage = response.message;
        this.snacbarService.openSnackbar(this.reponseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        console.log(error);
        if(error.error?.message){
          this.reponseMessage = error.error.message;
        }
        else{
          this.reponseMessage = GlobaConstants.genericError;
        }
        this.snacbarService.openSnackbar(this.reponseMessage, GlobaConstants.error);
      }
    });
  }

  edit(){
    var formData = this.themeForm.value;
    var data = {
      id:this.dialogData.data.id,
      wording: formData.wording,
      description: formData.description
    }

    this.themeService.update(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onEditTheme.emit();
        this.reponseMessage = response.message;
        this.snacbarService.openSnackbar(this.reponseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        console.log(error);
        if(error.error?.message){
          this.reponseMessage = error.error.message;
        }
        else{
          this.reponseMessage = GlobaConstants.genericError;
        }
        this.snacbarService.openSnackbar(this.reponseMessage, GlobaConstants.error);
      }
    });
  }

}
