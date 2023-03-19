import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-question-qcm',
  templateUrl: './question-qcm.component.html',
  styleUrls: ['./question-qcm.component.css']
})

export class QuestionQcmComponent implements OnInit{

  displayedColumns: string[] = ['content_question', 'edit'];
  dataSource:any;
  manageQuestionForm:any = FormGroup;
  responseMessage:any;
  themes:any = [];
  theme:any;
  Questions:any = [];
  question:any;
  id:any;

  onAddQuestionQcm = new EventEmitter();
  questionQcmForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private qcmService:QcmService, 
    private questionService: QuestionService,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    public dialogRef: MatDialogRef<QuestionQcmComponent>,
    private snackbarService: SnackbarService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.getThemes();
    this.questionQcmForm = this.formBuilder.group({
      num_question:[null, [Validators.required]],
      themeId:[null, [Validators.required]],
      content_question:[null, [Validators.required]],
      difficulty:[null, [Validators.required]]
    })
    this.manageQuestionForm = this.formBuilder.group({
      theme:[null, [Validators.required]]
    })
  }

  tableDataQuestion(id:any){
    
    this.questionService.getQuestionByThemeId(id).subscribe({
      next: (response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, 
      error: (error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
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

  getThemes(){
    this.themeService.getThemes().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.themes = response;
      },
      error:(error:any)=>{
        this.ngxService.stop();
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

  getThemeById(values:any){
    this.themeService.getThemeById(values.id).subscribe({
      next:(response:any)=>{
        this.theme = response;
        this.tableDataQuestion(this.theme.id);
        console.log(this.theme.questionId);
      },
      error:(error:any)=>{
        this.ngxService.stop();
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
  
  handleAddQuestionToQcmId(value:any) {
    this.ngxService.start();
    let id = this.dialogData.data.id;
    let data = {
      id: value.id,
      numQuestion: value.num_question,
      themeId: value.themeId,
      content_question: value.content_question,
      difficulty: value.difficulty
    }
    //console.log(data);
    //return;
    this.qcmService.addQuestionIntoQcm(id, data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.Questions = response;
        this.tableDataQuestion(this.theme.id);
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        this.ngxService.stop();
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
