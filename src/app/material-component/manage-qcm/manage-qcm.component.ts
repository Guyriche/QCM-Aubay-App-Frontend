import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { __values } from 'tslib';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { QcmComponent } from '../dialog/qcm/qcm.component';
import { QuestionQcmComponent } from '../dialog/question-qcm/question-qcm.component';

@Component({
  selector: 'app-manage-qcm',
  templateUrl: './manage-qcm.component.html',
  styleUrls: ['./manage-qcm.component.css']
})

export class ManageQcmComponent implements OnInit{

  displayedColumns: string[] = ['title_qcm', 'description_qcm','difficulty_qcm',
  'duration_qcm', 'num_qcm', 'edit'];
  dataSource: any;
  manageQcmForm:any = FormGroup;
  questions:any = [];
  id:any;
  question:any;

  responseMessage:any;

  constructor(private qcmService: QcmService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.manageQcmForm = this.formBuilder.group({
      question:[null, [Validators.required]]
    })
  }

  tableData() {
    this.qcmService.getAllQcm().subscribe({
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

  applyFilter(event: Event){
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QcmComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddQcm.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    this.id = dialogConfig.data.id
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QcmComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditQcm.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete' + values.title_qcm + 'QCM',
      confirmation:true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=>{
      this.ngxService.start();
      this.deleteQcm(values.id);
      dialogRef.close();
    })
  }

  deleteQcm(id: any) {
    this.qcmService.deleteQcm(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableData();
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

  handleShowAction(value:any){

  }

  handleAddQuestionsAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QuestionQcmComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

}
