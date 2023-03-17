import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{

  onAddQuestion = new EventEmitter();
  onEditQuestion = new EventEmitter();
  onDeleteQuestion = new EventEmitter();
  questionForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;
  themes:any = [];
  //propositions:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private themeService: ThemeService,
  private questionService: QuestionService,
  public dialogRef: MatDialogRef<QuestionComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      numQuestion:[null, [Validators.required]],
      themeId:[null, [Validators.required]],
      content_question:[null, [Validators.required]],
      difficulty:[null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = "Update";
      this.questionForm.patchValue(this.dialogData.data);
    }
    this.getThemes();
  }

  getThemes() {
    this.themeService.getThemes().subscribe({
      next:(response:any)=>{
        this.themes = response;
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
    
    var formData = this.questionForm.value;
    var data = {
      numQuestion: formData.numQuestion,
      themeId:formData.themeId,
      content_question: formData.content_question,
      difficulty: formData.difficulty
    }

    this.questionService.add(data).subscribe({
      next: (response:any)=>{
        this.dialogRef.close();
        this.onAddQuestion.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error:any)=>{
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
    });
  }

  edit() {
    
    var formData = this.questionForm.value;
    var data = {
      id: this.dialogData.data.id,
      numQuestion: formData.numQuestion,
      themeId:formData.themeId,
      content_question: formData.content_question,
      difficulty: formData.difficulty
    }

    this.questionService.update(data).subscribe({
      next: (response:any)=>{
        this.dialogRef.close();
        this.onEditQuestion.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error:any)=>{
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
    });
  }

}
