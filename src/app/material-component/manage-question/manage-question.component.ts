import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { QuestionComponent } from '../dialog/question/question.component';
import { ManagePropositionComponent } from '../manage-proposition/manage-proposition.component';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css']
})

export class ManageQuestionComponent implements OnInit{

  displayedColumns: string[] = ['numQuestion', 'content_question', 'difficulty', 'edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private questionService: QuestionService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private propositionService: PropositionService){}

  ngOnInit(): void {

    this.ngxService.start();
    this.tableDataQuestion();
  }

  tableDataQuestion(){
    
    this.questionService.getQuestion().subscribe({
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
      this.tableDataQuestion();
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
      this.tableDataQuestion();
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

  deleteQuestion(id:any){

    this.questionService.delete(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableDataQuestion();
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
