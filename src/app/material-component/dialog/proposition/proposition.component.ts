import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-proposition',
  templateUrl:'./proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {

  onAddProposition = new EventEmitter();
  onEditProposition = new EventEmitter();
  onDeleteProposition = new EventEmitter();
  propositionForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;
  questions:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private questionService: QuestionService,
  private propositionService: PropositionService,
  public dialogRef: MatDialogRef<QuestionComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.propositionForm = this.formBuilder.group({
      num_proposition:[null, [Validators.required]],
      content_proposition:[null, [Validators.required]],
      status_proposition:[null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = "Update";
      this.propositionForm.patchValue(this.dialogData.data);
    }
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestion().subscribe({
      next:(response)=>{
        this.questions = response;
      },
      error:(error:any)=>{
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
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
    var formData = this.propositionForm.value;
    var data = {
      num_proposition:formData.num_proposition,
      content_proposition:formData.content_proposition,
      status_proposition:formData.status_proposition
    }

    this.propositionService.addProposition(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onAddProposition.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      },
      error:(error:any)=>{
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

  edit() {

    var formData = this.propositionForm.value;
    var data = {
      id: this.dialogData.data.id,
      num_proposition:formData.num_proposition,
      questionId:formData.questionId,
      content_proposition:formData.content_proposition,
      status_proposition:formData.status_proposition
    }

    this.propositionService.update(data).subscribe({
      next:(response:any)=>{
        this.dialogRef.close();
        this.onEditProposition.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      },
      error:(error:any)=>{
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }
}
