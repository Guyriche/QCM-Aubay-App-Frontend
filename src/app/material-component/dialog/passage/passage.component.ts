import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PassageService } from 'src/app/services/passage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css']
})
export class PassageComponent implements OnInit
{

  onAddPassage    = new EventEmitter();
  onEditPassage   = new EventEmitter();
  onDeletePassage = new EventEmitter();
  onshowPassage   = new EventEmitter();
  
  passageForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;
  themes:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private passageService: PassageService,
  public dialogRef: MatDialogRef<PassageComponent>,
  private snackbarService: SnackbarService,
  private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
    //this.ngxService.start();
    this.passageForm = this.formBuilder.group({
      ref: [null, [Validators.required]],
      date_expiration: [null, [Validators.required]],
      candidate: [null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.passageForm.patchValue(this.dialogData.data);
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

  add() {
    let formData = this.passageForm.value;
    let data = {
      ref: formData.ref,
      date_expiration: formData.date_expiration,
      candidate: formData.candidate,
    }

    this.passageService.add(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddPassage.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

  edit() {
    let formData = this.passageForm.value;
    let data = {
      id:this.dialogData.data.id,
      ref: formData.ref,
      date_expiration: formData.date_expiration,
      candidate: formData.candidate,
    }

    this.passageService.update(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditPassage.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

}
