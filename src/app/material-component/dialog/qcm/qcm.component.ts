import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { QuestionQcmComponent } from '../question-qcm/question-qcm.component';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})

export class QcmComponent implements OnInit {

  onAddQcm = new EventEmitter();
  onEditQcm = new EventEmitter();
  onDeleteQcm = new EventEmitter();
  onshowQcm = new EventEmitter();

  qcmForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder: FormBuilder,
    private qcmService: QcmService,
    public dialogRef: MatDialogRef<QcmComponent>,
    private snacbarService: SnackbarService,
    private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.qcmForm = this.formBuilder.group({
      title_qcm:[null,[Validators.required]],
      description_qcm:[null, [Validators.required]],
      difficulty_qcm:[null, [Validators.required]],
      duration_qcm:[null, [Validators.required]],
      num_qcm:[null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.qcmForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    var formData = this.qcmForm.value;
    var data = {
      title_qcm:formData.title_qcm,
      description_qcm:formData.description_qcm,
      difficulty_qcm:formData.difficulty_qcm,
      duration_qcm:formData.duration_qcm,
      num_qcm:formData.num_qcm
    }

    this.qcmService.addNewQcm(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onAddQcm.emit();
        this.responseMessage = response.message;
        this.snacbarService.openSnackbar(this.responseMessage, "Success");
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
        this.snacbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    });
  }

  edit() {
    
    var formData = this.qcmForm.value;
    var data = {
      id:this.dialogData.data.id,
      title_qcm:formData.title_qcm,
      description_qcm:formData.description_qcm,
      difficulty_qcm:formData.difficulty_qcm,
      duration_qcm:formData.duration_qcm,
      num_qcm:formData.num_qcm
    }

    this.qcmService.updateQcm(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onEditQcm.emit();
        this.responseMessage = response.message;
        this.snacbarService.openSnackbar(this.responseMessage, "success");
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
        this.snacbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    });

  }

}
