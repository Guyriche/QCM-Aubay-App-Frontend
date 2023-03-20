import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { PropositionComponent } from '../dialog/proposition/proposition.component';

@Component({
  selector: 'app-manage-proposition',
  templateUrl: './manage-proposition.component.html',
  styleUrls: ['./manage-proposition.component.css']
})
export class ManagePropositionComponent implements OnInit{

  displayedColumns: string[] = ['num_proposition', 'content_proposition', 'status_proposition', 'edit'];
  dataSource:any ;
  managePropositionForm:any = FormGroup;
  questions:any = [];
  question:any;
  id:any;
  responseMessage:any;

  constructor(private propositionService: PropositionService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.getQuestions();
    this.getProposition();
    this.managePropositionForm = this.formBuilder.group({
      question: [null, [Validators.required]]
    })
  }

  getQuestions() {
    this.questionService.getQuestion().subscribe({
      next:(response)=>{
        this.ngxService.stop();
        this.questions = response;
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

  getProposition(){
    this.propositionService.getProposition().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
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

  getQuestionById(values:any){
    this.questionService.getQuestionById(values.id).subscribe({
      next:(response)=>{
        this.question = response;
        this.tableDataproposition(this.question.id);
        console.log(this.question.id);
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

  validateChoose(){

  }

  tableDataproposition(id: any) {
    this.propositionService.getAllPropositionByQuestionsId(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error:(error:any)=>{
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

  handleAddAction(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(PropositionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProposition.subscribe((response)=>{
      this.tableDataproposition(this.question.id);
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(PropositionComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProposition.subscribe((response)=>{
      this.tableDataproposition(this.question.id);
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete'+values.content_proposition+'proposition',
      confirmation:true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteProposition(this.question.id,values.id);
      dialogRef.close();
    })
  }

  deleteProposition(questionId:any, propositionId:any){
    
    this.propositionService.deletePropositionFromQuestion(questionId, propositionId).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableDataproposition(questionId);
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
