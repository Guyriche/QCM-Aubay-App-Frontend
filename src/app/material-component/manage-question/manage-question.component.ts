import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { DetailQuestionComponent } from '../details/detail-question/detail-question.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { QuestionPropositionComponent } from '../dialog/question-proposition/question-proposition.component';
import { QuestionComponent } from '../dialog/question/question.component';
import { ManagePropositionComponent } from '../manage-proposition/manage-proposition.component';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css']
})

export class ManageQuestionComponent implements OnInit{

  displayedColumns: string[] = ['num_question', 'content_question', 'difficulty', 'edit'];
  dataSource:any;
  manageQuestionForm:any = FormGroup;
  themes:any = [];
  id:any;
  theme:any;

  responseMessage:any;

  constructor(private questionService: QuestionService,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private propositionService: PropositionService){}

  ngOnInit(): void {

    this.ngxService.start();
    this.getThemes();
    this.manageQuestionForm = this.formBuilder.group({
      theme:[null, [Validators.required]]
    })
    //this.tableDataQuestion();
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

  applyFilter(event: Event){
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data= {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddQuestion.subscribe((response)=>{
      this.tableDataQuestion(this.theme.id);
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data= {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditQuestion.subscribe((response)=>{
      this.tableDataQuestion(this.theme.id);
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete '+values.content_question+' question',
      confirmation:true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteQuestion(values.id);
      dialogRef.close();
    })
  }

  handleAddPropositionsAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add Response',
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QuestionPropositionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

  handleAddShowDetails(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Show Detail',
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(DetailQuestionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

  deleteQuestion(id:any){

    this.questionService.delete(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableDataQuestion(id);
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
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

}
